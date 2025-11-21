import express from 'express';
import Stripe from 'stripe';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { createHash, randomUUID } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 10000;
const FRONTEND_URL = process.env.FRONTEND_URL || `http://localhost:${PORT}`;
const SOULMARK_SECRET = process.env.SOULMARK_SECRET;
const REGISTRY_PATH = path.join(__dirname, 'registry.json');

if (!SOULMARK_SECRET) {
  throw new Error('SOULMARK_SECRET is required in .env');
}

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Initialize registry.json if it doesn't exist
if (!existsSync(REGISTRY_PATH)) {
  writeFileSync(REGISTRY_PATH, JSON.stringify({ 
    donations: [], 
    identities: [], 
    orders: [] 
  }, null, 2));
}

// Helper: Read registry
function readRegistry() {
  const data = readFileSync(REGISTRY_PATH, 'utf-8');
  return JSON.parse(data);
}

// Helper: Write registry
function writeRegistry(data) {
  writeFileSync(REGISTRY_PATH, JSON.stringify(data, null, 2));
}

// Helper: Generate SoulMark (EXACT ALGORITHM - DO NOT MODIFY)
function generateSoulMark(email, timestamp) {
  const nonce = randomUUID();
  const data = `${email}${timestamp}${SOULMARK_SECRET}${nonce}`;
  return createHash('sha256').update(data).digest('hex');
}

// ============================================
// ENDPOINT: POST /create-checkout-session
// ============================================
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { name, email, amount } = req.body;

    if (!name || !email || !amount) {
      return res.status(400).json({ error: 'Missing required fields: name, email, amount' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'LawAid AI Service',
              description: `Payment from ${name}`
            },
            unit_amount: amount
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${FRONTEND_URL}/lawaid-complete.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/lawaid-index.html`,
      customer_email: email,
      metadata: {
        donor_name: name,
        donor_email: email
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ENDPOINT: POST /create-order
// ============================================
app.post('/create-order', (req, res) => {
  try {
    const { cart, app = 'lawaid', email } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Invalid cart' });
    }

    const registry = readRegistry();
    const orderId = `ord-${randomUUID()}`;
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = {
      order_id: orderId,
      app: app,
      email: email || null,
      items: cart,
      billing_mode: 'one_time',
      total_amount_cents: totalAmount,
      status: 'pending_payment',
      created_at: new Date().toISOString(),
      stripe_session_id: null,
      stripe_subscription_id: null,
      soulmark: null
    };

    registry.orders.push(order);
    writeRegistry(registry);

    res.json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ENDPOINT: POST /create-checkout-session-from-order
// ============================================
app.post('/create-checkout-session-from-order', async (req, res) => {
  try {
    const { orderId, email } = req.body;

    if (!orderId || !email) {
      return res.status(400).json({ error: 'Missing orderId or email' });
    }

    const registry = readRegistry();
    const order = registry.orders.find(o => o.order_id === orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const lineItems = order.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description || ''
        },
        unit_amount: item.price
      },
      quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${FRONTEND_URL}/lawaid-complete.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/lawaid-confirm.html`,
      customer_email: email,
      metadata: {
        order_id: orderId,
        customer_email: email
      }
    });

    order.email = email;
    order.stripe_session_id = session.id;
    order.status = 'checkout_created';
    writeRegistry(registry);

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Create checkout from order error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ENDPOINT: GET /verify-donation/:id
// ============================================
app.get('/verify-donation/:id', async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const registry = readRegistry();
    
    // Check if already recorded
    let donation = registry.donations.find(d => d.id === sessionId);
    if (donation) {
      return res.json(donation);
    }

    // Generate SoulMark
    const timestamp = new Date().toISOString();
    const soulmark = generateSoulMark(session.customer_email, timestamp);

    // Find associated order if exists
    const orderId = session.metadata?.order_id || null;
    if (orderId) {
      const order = registry.orders.find(o => o.order_id === orderId);
      if (order) {
        order.status = 'paid';
        order.soulmark = soulmark;
      }
    }

    // Create donation record
    donation = {
      id: sessionId,
      name: session.metadata?.donor_name || 'Anonymous',
      email: session.customer_email,
      amount: session.amount_total,
      timestamp: timestamp,
      soulmark: soulmark,
      username_created: false,
      identity_username: null,
      order_id: orderId
    };

    registry.donations.push(donation);
    writeRegistry(registry);

    res.json(donation);
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ENDPOINT: GET /donations
// ============================================
app.get('/donations', (req, res) => {
  try {
    const registry = readRegistry();
    res.json(registry.donations);
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ENDPOINT: GET /check-username/:username
// ============================================
app.get('/check-username/:username', (req, res) => {
  try {
    const username = req.params.username;
    const registry = readRegistry();
    
    const exists = registry.identities.some(
      identity => identity.username.toLowerCase() === username.toLowerCase()
    );

    res.json({ available: !exists });
  } catch (error) {
    console.error('Check username error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ENDPOINT: POST /register-username
// ============================================
app.post('/register-username', (req, res) => {
  try {
    const { email, username, soulmark } = req.body;

    if (!email || !username || !soulmark) {
      return res.status(400).json({ error: 'Missing required fields: email, username, soulmark' });
    }

    const registry = readRegistry();

    // Check if email already has an identity
    let identity = registry.identities.find(i => i.email === email);

    if (identity) {
      // Update existing identity
      if (!identity.soulmarks.includes(soulmark)) {
        identity.soulmarks.push(soulmark);
      }
    } else {
      // Check if username is already taken by another email
      const usernameTaken = registry.identities.some(
        i => i.username.toLowerCase() === username.toLowerCase()
      );

      if (usernameTaken) {
        return res.status(409).json({ error: 'Username already taken' });
      }

      // Create new identity
      identity = {
        identity_id: `ias-${randomUUID()}`,
        username: username,
        email: email,
        soulmarks: [soulmark],
        registered_since: new Date().toISOString()
      };

      registry.identities.push(identity);
    }

    // Backfill donations with username
    registry.donations.forEach(donation => {
      if (donation.email === email) {
        donation.username_created = true;
        donation.identity_username = username;
      }
    });

    writeRegistry(registry);

    res.json(identity);
  } catch (error) {
    console.error('Register username error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LawAid AI Server running on port ${PORT}`);
  console.log(`📁 Registry: ${REGISTRY_PATH}`);
  console.log(`🔐 SoulMark generation: ENABLED`);
});
