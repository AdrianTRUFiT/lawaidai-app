// Creating the shared styles first
const stylesContent = `
/* ============================================
   LAWAID AI - SOULSYSTEM© COMPATIBLE STYLES
   ============================================ */

:root {
  --primary-blue: #1a56db;
  --primary-dark: #0d2238;
  --secondary-green: #47c28a;
  --accent-gold: #f59e0b;
  --text-light: #dfe9f3;
  --text-dark: #1f2937;
  --bg-dark: #081726;
  --bg-card: #0d2238;
  --border-color: rgba(255, 255, 255, 0.07);
  --error-red: #ef4444;
  --warning-orange: #f97316;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, var(--bg-dark) 0%, var(--primary-dark) 100%);
  color: var(--text-light);
  min-height: 100vh;
  line-height: 1.6;
}

/* ============================================
   LAYOUT CONTAINERS
   ============================================ */

.app-shell {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.card {
  background: var(--bg-card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-color);
  max-width: 600px;
  width: 100%;
}

.header-card {
  text-align: center;
  margin-bottom: 32px;
}

.header-card h1 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--secondary-green), var(--primary-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.header-card p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}

/* ============================================
   IDENTITY PILL
   ============================================ */

.identity-pill {
  display: inline-block;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-green));
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  margin: 12px 0;
}

/* ============================================
   FORM ELEMENTS
   ============================================ */

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-light);
  font-size: 0.95rem;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-light);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--secondary-green);
  background: rgba(255, 255, 255, 0.08);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.small-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 4px;
  display: block;
}

.error-message {
  color: var(--error-red);
  font-size: 0.85rem;
  margin-top: 8px;
}

.success-message {
  color: var(--secondary-green);
  font-size: 0.85rem;
  margin-top: 8px;
}

/* ============================================
   BUTTONS
   ============================================ */

.btn-primary,
.btn-secondary,
.btn-outline,
.module-btn {
  display: inline-block;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  text-decoration: none;
  width: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-green));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(71, 194, 138, 0.3);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.btn-outline {
  background: transparent;
  color: var(--secondary-green);
  border: 2px solid var(--secondary-green);
}

.btn-outline:hover {
  background: var(--secondary-green);
  color: white;
}

.module-btn {
  background: rgba(71, 194, 138, 0.1);
  color: var(--text-light);
  border: 1px solid rgba(71, 194, 138, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.module-btn:hover {
  background: rgba(71, 194, 138, 0.2);
  border-color: var(--secondary-green);
}

/* ============================================
   DASHBOARD COMPONENTS
   ============================================ */

.dash-card {
  background: rgba(255, 255, 255, 0.03);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin-bottom: 24px;
}

.dash-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-light);
}

.dash-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

/* ============================================
   AI WELLNESS 360 COMPONENTS
   ============================================ */

.chip-button {
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid var(--border-color);
  border-radius: 20px;
  color: var(--text-light);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 100px;
}

.chip-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--secondary-green);
}

.chip-button.chip-active {
  background: var(--secondary-green);
  border-color: var(--secondary-green);
  color: white;
}

/* ============================================
   PRODUCT CARDS (for LawAid offerings)
   ============================================ */

.product-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.product-card:hover {
  border-color: var(--secondary-green);
  transform: translateY(-2px);
}

.product-card.selected {
  border-color: var(--secondary-green);
  background: rgba(71, 194, 138, 0.1);
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.product-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-light);
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--secondary-green);
}

.product-description {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
  line-height: 1.6;
}

.product-features {
  list-style: none;
  margin-bottom: 16px;
}

.product-features li {
  padding: 8px 0;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-features li:before {
  content: "✓";
  color: var(--secondary-green);
  font-weight: bold;
}

/* ============================================
   ORDER REVIEW / CART
   ============================================ */

.order-summary {
  background: rgba(255, 255, 255, 0.03);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin: 24px 0;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}

.order-item:last-child {
  border-bottom: none;
}

.order-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--secondary-green);
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid var(--border-color);
}

/* ============================================
   RECEIPTS / TRANSACTIONS
   ============================================ */

.receipt-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}

.receipt-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.receipt-amount {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--secondary-green);
}

.receipt-date {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.receipt-soulmark {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  word-break: break-all;
}

/* ============================================
   LOGOUT BUTTON
   ============================================ */

.logout-btn {
  text-align: center;
  padding: 12px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.3s ease;
  margin-top: 24px;
}

.logout-btn:hover {
  color: var(--error-red);
}

/* ============================================
   LOADING STATES
   ============================================ */

.loading-spinner {
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid var(--secondary-green);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ============================================
   MOBILE RESPONSIVENESS
   ============================================ */

@media (max-width: 768px) {
  .card {
    padding: 24px;
  }
  
  .header-card h1 {
    font-size: 2rem;
  }
  
  .dash-grid {
    grid-template-columns: 1fr;
  }
  
  .product-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  body {
    padding-bottom: 80px;
  }
}

/* ============================================
   MOBILE NAVIGATION BAR
   ============================================ */

.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 62px;
  background: var(--bg-dark);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 999;
}

.mobile-nav button {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 0.78rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.8;
  cursor: pointer;
}

.mobile-nav button.active {
  opacity: 1;
  color: var(--secondary-green);
}

.mobile-nav button span {
  margin-top: 3px;
  font-size: 0.65rem;
}

/* ============================================
   UTILITY CLASSES
   ============================================ */

.text-center {
  text-align: center;
}

.mb-16 {
  margin-bottom: 16px;
}

.mb-24 {
  margin-bottom: 24px;
}

.mt-16 {
  margin-top: 16px;
}

.mt-24 {
  margin-top: 24px;
}

.hidden {
  display: none;
}

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.gap-12 {
  gap: 12px;
}

.gap-16 {
  gap: 16px;
}
`;

// Creating shared utilities
const utilsContent = `
// ============================================
// LAWAID AI - CORE UTILITIES
// SoulSystem© Compatible
// ============================================

// API Base URL (adjust for production)
const API_BASE = window.location.origin;

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

const Storage = {
  // Get item with fallback
  get(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? value : fallback;
    } catch (e) {
      console.error('Storage get error:', e);
      return fallback;
    }
  },
  
  // Set item
  set(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },
  
  // Remove item
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Storage remove error:', e);
      return false;
    }
  },
  
  // Clear all identity data
  clearIdentity() {
    const keysToRemove = [
      'ias_username',
      'ias_email',
      'ias_soulmark',
      'ias_identity_id',
      'fta_email',
      'fta_name',
      'fta_soulmark'
    ];
    keysToRemove.forEach(key => this.remove(key));
  }
};

// ============================================
// API HELPERS
// ============================================

const API = {
  // Generic fetch wrapper
  async fetch(endpoint, options = {}) {
    try {
      const response = await fetch(\`\${API_BASE}\${endpoint}\`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // Create order
  async createOrder(cart) {
    return this.fetch('/create-order', {
      method: 'POST',
      body: JSON.stringify({ cart })
    });
  },
  
  // Create checkout session from order
  async createCheckoutSession(orderId, email) {
    return this.fetch('/create-checkout-session-from-order', {
      method: 'POST',
      body: JSON.stringify({ orderId, email })
    });
  },
  
  // Verify donation
  async verifyDonation(sessionId) {
    return this.fetch(\`/verify-donation/\${sessionId}\`);
  },
  
  // Check username availability
  async checkUsername(username) {
    return this.fetch(\`/check-username/\${username}\`);
  },
  
  // Register username
  async registerUsername(email, username, soulmark) {
    return this.fetch('/register-username', {
      method: 'POST',
      body: JSON.stringify({ email, username, soulmark })
    });
  },
  
  // Get donations
  async getDonations() {
    return this.fetch('/donations');
  }
};

// ============================================
// IDENTITY HELPERS
// ============================================

const Identity = {
  // Check if user is logged in
  isLoggedIn() {
    return !!Storage.get('ias_username');
  },
  
  // Get current username
  getUsername() {
    return Storage.get('ias_username') || Storage.get('fta_email', '').split('@')[0] + '@iascendai';
  },
  
  // Get current email
  getEmail() {
    return Storage.get('ias_email') || Storage.get('fta_email');
  },
  
  // Get SoulMark
  getSoulMark() {
    return Storage.get('ias_soulmark') || Storage.get('fta_soulmark');
  },
  
  // Logout
  logout() {
    Storage.clearIdentity();
    window.location.href = 'lawaid-login.html';
  },
  
  // Require authentication
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = 'lawaid-auth.html';
      return false;
    }
    return true;
  }
};

// ============================================
// FORMATTING HELPERS
// ============================================

const Format = {
  // Format currency (cents to dollars)
  currency(cents) {
    return \`$\${(cents / 100).toFixed(2)}\`;
  },
  
  // Format date
  date(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },
  
  // Format date and time
  datetime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },
  
  // Mask email
  maskEmail(email) {
    if (!email) return '';
    const [local, domain] = email.split('@');
    const maskedLocal = local[0] + '***' + local[local.length - 1];
    return \`\${maskedLocal}@\${domain}\`;
  },
  
  // Mask SoulMark (show first 8 and last 8 characters)
  maskSoulMark(soulmark) {
    if (!soulmark || soulmark.length < 16) return soulmark;
    return \`\${soulmark.slice(0, 8)}...\${soulmark.slice(-8)}\`;
  }
};

// ============================================
// UI HELPERS
// ============================================

const UI = {
  // Show error message
  showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = message;
      el.className = 'error-message';
      el.style.display = 'block';
    }
  },
  
  // Show success message
  showSuccess(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = message;
      el.className = 'success-message';
      el.style.display = 'block';
    }
  },
  
  // Clear message
  clearMessage(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = '';
      el.style.display = 'none';
    }
  },
  
  // Show loading
  showLoading(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.innerHTML = '<div class="loading-spinner"></div>';
      el.style.display = 'block';
    }
  },
  
  // Enable/disable button
  toggleButton(buttonId, enabled) {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.disabled = !enabled;
    }
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Storage, API, Identity, Format, UI };
}
`;

