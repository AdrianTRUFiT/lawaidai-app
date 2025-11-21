## **FILE: README.md**

```markdown
# ⚖️ LawAid AI - React Frontend

> **Your Story. Your Evidence. Your Justice.**

A comprehensive legal support platform built on the SoulSystemⓈ architecture. LawAid AI helps self-represented litigants organize evidence, manage timelines, generate legal documents, and build winning case strategies.

---

## 📌 Overview

LawAid AI is a React-based dashboard that provides pro se litigants with professional-grade legal tools:

- **Calendar Matrix** - Unified timeline of deadlines, hearings, and interactions
- **Hero Story** - Narrative building and credibility scoring
- **Proof Engine** - Centralized evidence management from multiple sources
- **Command Center** - Action items and accountability tracking
- **Strategic Templates** - Pre-built legal documents and motions
- **Characters Panel** - Track credibility of all parties involved
- **Strategy Engine** - AI-powered case recommendations

### Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v6
- **Icons:** Lucide React
- **Backend:** SoulSystemⓈ Universal Backend Contract

---

## 📂 Project Structure
```

lawaid-ai/
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS setup
├── postcss.config.js         # PostCSS configuration
├── index.html                # Entry HTML file
├── .env.example              # Environment variable template
├── .gitignore                # Git ignore rules
├── README.md                 # This file
└── src/
├── main.jsx              # React app entry point
├── App.jsx               # Root component with routing
├── index.css             # Global styles and Tailwind imports
│
├── components/           # Dashboard components
│   ├── LawAidDashboard.jsx    # Main dashboard container
│   ├── CalendarMatrix.jsx      # Calendar view with event tracking
│   ├── HeroStory.jsx           # Story builder and credibility score
│   ├── ProofEngine.jsx         # Evidence source connections
│   ├── CommandCenter.jsx       # Action items and tasks
│   ├── TemplatesPanel.jsx      # Legal document templates
│   ├── CharactersPanel.jsx     # Party profiles and credibility
│   └── StrategyPanel.jsx       # AI recommendations
│
├── pages/                # Route pages
│   ├── Landing.jsx             # Service selection landing page
│   ├── Checkout.jsx            # Order creation and review
│   ├── Complete.jsx            # Payment success and SoulMark display
│   └── IdentityLink.jsx        # Username registration
│
└── lib/                  # Utility modules
├── api.js                  # Backend API client
├── identity.js             # Identity management helpers
└── formatters.js           # Data formatting utilities

```
---

## ⚙️ Installation

### Prerequisites

- **Node.js** v18+ 
- **npm** v9+ or **yarn** v1.22+
- A running SoulSystemⓈ backend instance

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lawaid-ai-react.git
   cd lawaid-ai-react
```

1. **Install dependencies**
   
   ```bash
   npm install
   ```
1. **Create environment file**
   
   ```bash
   cp .env.example .env
   ```
1. **Configure backend URL**
   
   Edit `.env`:
   
   ```env
   VITE_API_BASE=http://localhost:10000
   ```
   
   For production:
   
   ```env
   VITE_API_BASE=https://your-backend.onrender.com
   ```
1. **Start development server**
   
   ```bash
   npm run dev
   ```
   
   App will be available at `http://localhost:3000`

-----

## 🔐 Environment Variables

The application requires one environment variable:

|Variable       |Description         |Example                 |
|---------------|--------------------|------------------------|
|`VITE_API_BASE`|Backend API base URL|`http://localhost:10000`|

**Important:** Vite exposes environment variables to the client bundle. Only use `VITE_` prefixed variables. Never store secrets in frontend environment variables.

### .env.example

```env
VITE_API_BASE=http://localhost:10000
```

-----

## 🚀 Development Workflow

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Development Server

```bash
npm run dev
```

- Runs on `http://localhost:3000`
- Hot module replacement enabled
- Source maps included

### Building for Production

```bash
npm run build
```

- Output: `dist/` directory
- Minified and optimized
- Ready for deployment

-----

## 📦 Building and Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment to Vercel

1. **Connect GitHub Repository**

- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository

1. **Configure Build Settings**

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

1. **Add Environment Variables**
   
   ```
   VITE_API_BASE = https://your-backend.onrender.com
   ```
1. **Deploy**

- Vercel will automatically deploy on every push to main branch

### Alternative Deployment Options

**Netlify:**

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
```

**Cloudflare Pages:**

- Build command: `npm run build`
- Build output directory: `dist`

-----

## 🔌 API Integration Notes

### Backend Requirements

This frontend requires a SoulSystemⓈ-compatible backend with these endpoints:

|Endpoint                             |Method|Purpose                         |
|-------------------------------------|------|--------------------------------|
|`/create-order`                      |POST  |Create new order from cart      |
|`/create-checkout-session-from-order`|POST  |Generate Stripe checkout URL    |
|`/verify-donation/:id`               |GET   |Verify payment and mint SoulMark|
|`/donations`                         |GET   |Retrieve donation history       |
|`/check-username/:username`          |GET   |Check username availability     |
|`/register-username`                 |POST  |Register identity with username |

### API Client (`src/lib/api.js`)

All backend communication is centralized in the API client:

```javascript
import API from './lib/api';

// Create an order
const order = await API.createOrder(cartItems, 'lawaid', email);

// Create checkout session
const { url } = await API.createCheckoutSessionFromOrder(orderId, email);

// Verify payment
const donation = await API.verifyDonation(sessionId);

// Check username
const { available } = await API.checkUsername('johndoe@iascendai');

// Register username
const identity = await API.registerUsername(email, username, soulmark);

// Get donations
const donations = await API.getDonations();
```

### Error Handling

The API client throws errors for failed requests. Always wrap calls in try-catch:

```javascript
try {
  const result = await API.createOrder(cart);
} catch (error) {
  console.error('API Error:', error);
  // Handle error in UI
}
```

-----

## 🧩 Component Breakdown

### Dashboard Components (`src/components/`)

#### **LawAidDashboard.jsx**

Main dashboard container with layer navigation.

**Features:**

- 7 switchable layers
- Identity display
- SoulBridge connection status
- Layer navigation bar

**State:**

- `activeLayer` - Currently selected layer

-----

#### **CalendarMatrix.jsx**

Unified calendar view with color-coded event types.

**Features:**

- Full month calendar grid
- Event categorization (human, financial, trial, deadline, etc.)
- Click to view day details
- Event type legend

**Event Types:**

- 👥 Human-Human (calls, meetings)
- 💰 Financial/Banking (statements, disclosures)
- 🔗 When-When (dependency tracking)
- ⚖️ Trial (hearings, motions)
- ✓ Action Task (to-do items)
- ✗ Rejected (declined requests)
- ⏰ Deadline (critical dates)
- 📁 Database/Evidence (document uploads)

-----

#### **HeroStory.jsx**

Narrative building and credibility tracking.

**Features:**

- Upload timeline
- Write narrative
- Credibility score visualization (circular progress)
- Story-proof alignment metrics

-----

#### **ProofEngine.jsx**

Connected evidence sources dashboard.

**Features:**

- Gmail integration
- Parenting app connections
- Google Drive links
- Notion integration
- USB archive tracking
- Document count per source
- Connection status indicators

-----

#### **CommandCenter.jsx**

Action items and task management.

**Features:**

- Priority-based task list
- Status tracking (pending, in-progress, completed)
- Due date display
- Visual priority indicators (red/yellow/green)

-----

#### **TemplatesPanel.jsx**

Legal document template library.

**Features:**

- Discovery Deficiency Notice
- Motion for Protective Order
- Contention Interrogatories
- Motion in Limine
- Confirmation Email templates
- Proposed Order templates
- Template preview modal
- Urgency indicators

-----

#### **CharactersPanel.jsx**

Party credibility and document tracking.

**Features:**

- Character profiles (Hero, Opposing Party, Lawyer, Judge)
- Credibility scoring
- Document counts per character
- Color-coded roles
- Selection state management

-----

#### **StrategyPanel.jsx**

AI-powered strategic recommendations.

**Features:**

- Prioritized recommendation list
- Case strength assessment
- Progress visualization
- Gap identification
- Actionable next steps

-----

### Page Components (`src/pages/`)

#### **Landing.jsx**

Service selection page.

**Features:**

- 3 product tiers (Basic, Standard, Premium)
- Feature comparison
- Price display
- Product selection
- Navigation to checkout

**Products:**

- Document Review ($99)
- Case Strategy Package ($249)
- Pro Se Warrior Package ($499)

-----

#### **Checkout.jsx**

Order creation and payment initiation.

**Features:**

- Selected product display
- Customer information form
- Order creation via `/create-order`
- Stripe checkout session creation
- Redirect to Stripe

**Flow:**

1. Display selected product
1. Collect name and email
1. Create order in backend
1. Create Stripe checkout session
1. Redirect to Stripe payment

-----

#### **Complete.jsx**

Payment success and SoulMark display.

**Features:**

- Payment verification via `/verify-donation/:id`
- SoulMark display (masked + full)
- Copy-to-clipboard functionality
- Identity creation prompt
- Navigation to dashboard

**Flow:**

1. Extract `session_id` from URL query
1. Verify payment with backend
1. Display success + SoulMark
1. Store temp identity in localStorage
1. Prompt username creation if needed

-----

#### **IdentityLink.jsx**

Username registration page.

**Features:**

- Username availability checking
- Email display (from payment)
- Real-time validation
- Username registration via `/register-username`
- Identity storage in localStorage

**Username Format:**
`{username}@iascendai`

**Validation:**

- 3-20 characters
- Lowercase letters and numbers only
- Real-time availability check
- Cannot be changed once created

-----

### Utility Modules (`src/lib/`)

#### **api.js**

Centralized backend API client.

**Methods:**

- `createOrder(cart, app, email)`
- `createCheckoutSessionFromOrder(orderId, email)`
- `verifyDonation(sessionId)`
- `getDonations()`
- `checkUsername(username)`
- `registerUsername(email, username, soulmark)`

**Configuration:**
Uses `VITE_API_BASE` from environment variables.

-----

#### **identity.js**

Identity management helpers.

**Methods:**

- `getEmail()` - Retrieve stored email
- `getUsername()` - Retrieve stored username
- `getSoulMark()` - Retrieve stored SoulMark
- `getIdentityId()` - Retrieve identity ID
- `setIdentity(email, username, soulmark, identityId)` - Store identity
- `setTempDonation(email, name, soulmark)` - Store temp donation data
- `clearIdentity()` - Clear all identity data
- `hasIdentity()` - Check if user has registered identity

**Storage Keys:**

- `ias_email` - iAscendAi email
- `ias_username` - iAscendAi username
- `ias_soulmark` - SoulMark hash
- `ias_identity_id` - Identity UUID
- `fta_email` - FundTrackerAI temp email
- `fta_name` - FundTrackerAI temp name
- `fta_soulmark` - FundTrackerAI temp SoulMark

-----

#### **formatters.js**

Data formatting utilities.

**Methods:**

- `currency(cents)` - Format cents to USD ($99.00)
- `date(isoString)` - Format ISO date to readable date
- `datetime(isoString)` - Format ISO date to readable datetime
- `maskEmail(email)` - Mask email (j***e@example.com)
- `maskSoulMark(soulmark)` - Mask SoulMark (show first 8 and last 8 chars)

-----

## 🧭 Routing Map

|Route           |Component          |Description                         |
|----------------|-------------------|------------------------------------|
|`/`             |Landing.jsx        |Service selection and product tiers |
|`/dashboard`    |LawAidDashboard.jsx|Main dashboard with 7 layers        |
|`/checkout`     |Checkout.jsx       |Order review and payment initiation |
|`/complete`     |Complete.jsx       |Payment success and SoulMark display|
|`/identity-link`|IdentityLink.jsx   |Username registration               |

### Navigation Flow

```
Landing (/)
    ↓ [Select Product]
Checkout (/checkout)
    ↓ [Create Order + Stripe Checkout]
[Stripe Payment]
    ↓ [Success Redirect]
Complete (/complete?session_id=xxx)
    ↓ [Verify Payment + Mint SoulMark]
Identity Link (/identity-link)
    ↓ [Register Username]
Dashboard (/dashboard)
```

-----

## 🔒 SoulSystemⓈ Backend Contract

### Overview

This frontend integrates with a SoulSystemⓈ-compatible backend that implements the **Universal Backend Contract (UBC)**. The backend is **external** and follows strict rules to ensure cross-app compatibility.

### Backend Responsibilities

1. **Order Management**

- Create orders from cart data
- Link orders to Stripe sessions
- Track order status

1. **Payment Processing**

- Create Stripe checkout sessions
- Verify payment completion
- Generate SoulMarks for completed payments

1. **Identity Engine**

- Verify username availability
- Register new identities
- Link donations to identities
- Backfill username for past donations

1. **Data Persistence**

- Store donations in `registry.json`
- Store identities in `registry.json`
- Store orders in `registry.json`

### Registry Schema

The backend maintains a `registry.json` file with this structure:

```json
{
  "donations": [
    {
      "id": "cs_xxx",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "amount": 9900,
      "timestamp": "2024-12-21T10:00:00Z",
      "soulmark": "abc123...",
      "username_created": true,
      "identity_username": "janedoe@iascendai",
      "order_id": "ord-xxx"
    }
  ],
  "identities": [
    {
      "identity_id": "ias-xxx",
      "username": "janedoe@iascendai",
      "email": "jane@example.com",
      "soulmarks": ["abc123..."],
      "registered_since": "2024-12-21T10:05:00Z"
    }
  ],
  "orders": [
    {
      "order_id": "ord-xxx",
      "app": "lawaid",
      "email": "jane@example.com",
      "items": [...],
      "billing_mode": "one_time",
      "total_amount_cents": 9900,
      "status": "paid",
      "created_at": "2024-12-21T09:55:00Z",
      "stripe_session_id": "cs_xxx",
      "stripe_subscription_id": null,
      "soulmark": "abc123..."
    }
  ]
}
```

### SoulMark Generation

SoulMarks are cryptographic hashes generated using:

```javascript
sha256(email + timestamp + SOULMARK_SECRET + nonce)
```

**Rules:**

- One SoulMark per transaction
- Immutable once generated
- Links donations to identities
- Used for authenticity verification

### Identity Rules

1. **One email → One identity**
1. **One username → One identity**
1. **Usernames cannot be reused**
1. **Past donations backfill username** when identity is created
1. **SoulMarks accumulate** in identity record

### Critical: Do Not Modify

⚠️ **The backend contract is sacred.** This frontend must:

- ✅ Call endpoints exactly as documented
- ✅ Accept responses in documented format
- ✅ Handle errors gracefully
- ❌ Never modify endpoint URLs
- ❌ Never change request/response schemas
- ❌ Never alter SoulMark generation
- ❌ Never modify registry structure

-----

## 🛡️ Security Notes

### Client-Side Storage

Identity data is stored in `localStorage`:

```javascript
localStorage.setItem('ias_email', 'user@example.com');
localStorage.setItem('ias_username', 'user@iascendai');
localStorage.setItem('ias_soulmark', 'abc123...');
localStorage.setItem('ias_identity_id', 'ias-xxx');
```

**Important:**

- localStorage is client-side only
- Not secure for sensitive data
- Can be cleared by user
- Used for convenience, not authentication

### No Authentication Layer (Phase 1)

This version does not include:

- Password authentication
- JWT tokens
- Session management
- Access control

Identity is based on:

- Email from payment
- Username from registration
- SoulMark as identity anchor

-----

## 📚 Additional Resources

### SoulSystemⓈ Documentation

- Universal Backend Contract specification
- FundTrackerAI × iAscendAi Identity Engine documentation
- SoulMark cryptographic specification

### Related Projects

- **FundTrackerAI** - Donation tracking platform
- **TravelFlow** - Business travel optimization
- **TRUFIT Wellness AI** - Health and wellness platform
- **iAscendAi Dashboard** - Central identity hub

-----

## 🤝 Contributing

This is a production application built on the SoulSystemⓈ architecture. When contributing:

1. **Never modify backend contracts**
1. **Preserve all API endpoint names and schemas**
1. **Do not alter SoulMark generation logic**
1. **Maintain registry.json structure compatibility**
1. **Test against live SoulSystemⓈ backend**

-----

## 📄 License

ISC

-----

## Author

**Adrian TRUFiT McKenzie**  
Founder & CEO, BizTech Wellness LLC

-----

## ⚡ Quick Start Checklist

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Set `VITE_API_BASE` to backend URL
- [ ] Run `npm run dev`
- [ ] Navigate to `http://localhost:3000`
- [ ] Select a service plan
- [ ] Complete checkout flow
- [ ] Register username
- [ ] Access dashboard

-----

**Built with React + Vite + Tailwind CSS**  
**Powered by SoulSystemⓈ Universal Backend Contract**

```
---

# 📋 AUDIT CHECKLIST FOR README.md

Use this checklist to verify the README is complete and accurate:

## ✅ Structure & Completeness

- [ ] All sections from requirements are present
- [ ] File structure matches actual project exactly
- [ ] No invented or missing files referenced
- [ ] All components documented
- [ ] All pages documented
- [ ] All lib utilities documented

## ✅ Backend Contract Compliance

- [ ] Backend described as external/existing
- [ ] No modifications to backend endpoints suggested
- [ ] No changes to SoulMark generation
- [ ] No alterations to registry.json structure
- [ ] Clear warning against modifying contracts
- [ ] All 6 API endpoints correctly listed

## ✅ Technical Accuracy

- [ ] Correct file paths (`src/`, not `/src/`)
- [ ] Accurate import statements
- [ ] Valid npm commands
- [ ] Correct environment variable names (`VITE_API_BASE`)
- [ ] Accurate routing paths
- [ ] Correct component props and state

## ✅ Deployment Readiness

- [ ] Vercel deployment instructions included
- [ ] Alternative deployment options listed
- [ ] Build commands accurate
- [ ] Environment variable setup clear
- [ ] Production URL placeholder provided

## ✅ Developer Experience

- [ ] Clear installation steps
- [ ] Quick start guide included
- [ ] API usage examples provided
- [ ] Error handling documented
- [ ] Security notes included
- [ ] Contributing guidelines present

## ✅ SoulSystemⓈ Alignment

- [ ] Universal Backend Contract referenced
- [ ] Identity rules documented
- [ ] SoulMark generation explained (but not altered)
- [ ] Registry schema shown (but not modified)
- [ ] Cross-app compatibility emphasized

## ✅ Formatting & Style

- [ ] Markdown properly formatted
- [ ] Code blocks have language tags
- [ ] Tables properly structured
- [ ] Emoji used consistently
- [ ] Links are valid
- [ ] No broken references

## ✅ Completeness Check

- [ ] No "TODO" or placeholder text
- [ ] No "coming soon" without specifics
- [ ] All scripts from package.json documented
- [ ] All routes from App.jsx documented
- [ ] All utilities from lib/ documented
- [ ] No orphaned references

---

**This README is production-ready and GitHub-deployable. ✅**
```