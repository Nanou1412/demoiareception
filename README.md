# AI Receptionist Demo

A multi-industry AI receptionist demonstration powered by OpenAI's GPT-4 and TTS.

## 🚀 Features

- **38 Industries** - Restaurant, Medical, Salon, Legal, and more
- **Natural Voice** - OpenAI TTS with industry-specific voices
- **Auto Demo Mode** - Watch a full conversation unfold
- **Interactive Mode** - Type or speak to the AI
- **SMS & Ticket** - Visual confirmation previews
- **ROI Calculator** - Show potential savings

## 📁 Project Structure

```
├── public/                 # Frontend files
│   ├── index.html         # Main HTML
│   ├── style.css          # Styles
│   └── js/                # Modular JavaScript
│       ├── app.js         # Main entry point
│       ├── state.js       # State management
│       ├── industries.js  # Auto-generated from /industries
│       ├── ui.js          # UI updates
│       ├── api.js         # API calls
│       ├── audio.js       # TTS handling
│       ├── demo.js        # Demo controller
│       ├── templates.js   # SMS/Ticket templates
│       ├── navigation.js  # Page navigation
│       └── utils.js       # Timer, Speech recognition
│
├── industries/            # Industry configurations (1 file per industry)
│   ├── index.js          # Central registry
│   ├── restaurant.js     # Restaurant config + prompt
│   ├── pizza.js          # Pizza config + prompt
│   └── ...               # 38 total industries
│
├── netlify/functions/     # Serverless functions
│   ├── chat.js           # Main chat API
│   ├── chat-tts.js       # TTS API
│   └── chat-reset.js     # Reset conversation
│
├── shared/               # Shared utilities
│   └── prompts.js        # Re-exports from industries
│
├── scripts/              # Build scripts
│   └── build-industries.js  # Generate frontend industries.js
│
├── server.js             # Express server (local dev)
├── package.json          # Dependencies
└── netlify.toml          # Netlify config
```

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/Nanou1412/demoiareception.git
cd demoiareception

# Install dependencies
npm install

# Set environment variable
export OPENAI_API_KEY=your_key_here

# Build frontend industries
npm run build

# Start server
npm start
```

Open http://localhost:3000

## 📝 Adding a New Industry

1. Create `/industries/newindustry.js`:

```javascript
const newindustry = {
    id: 'newindustry',
    category: 'services',  // food, health, services, professional, lifestyle
    icon: '🆕',
    customerIcon: '👤',
    voice: 'shimmer',  // shimmer, nova, echo, onyx
    color: '#6366f1',
    cardIcon: 'fa-star',
    
    prompt: `You're [Name], a friendly receptionist at [Business]...`,
    
    quickActions: [
        { emoji: '📞', label: 'Book', text: "I'd like to book..." }
    ],
    
    menuItems: [
        { emoji: '⭐', name: 'Service', desc: 'Description', price: 99 }
    ],
    
    stepInfos: [
        "📞 AI answers the call...",
        "📋 Taking details...",
        "✅ Confirming...",
        "🎉 Done!"
    ],
    
    demoScript: [
        { delay: 2000, type: 'greeting' },
        { delay: 2500, type: 'service' },
        // ...
    ],
    
    en: {
        name: 'Business Name',
        aiName: 'AI Name',
        steps: ['Call', 'Book', 'Confirm', 'Done'],
        totalLabel: 'Total',
        cardTitle: 'Booking',
        responses: {
            greeting: "Hi, I'd like to...",
            service: "...",
            // matching demoScript types
        }
    }
};

module.exports = newindustry;
```

2. Add to `/industries/index.js`:

```javascript
const newindustry = require('./newindustry');
// Add to INDUSTRIES object
// Add to CATEGORIES
```

3. Rebuild frontend:

```bash
npm run build
```

4. Add industry card to `index.html`

## 🚀 Deployment

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Set `OPENAI_API_KEY` in Netlify environment variables.

## 📊 Industry Categories

| Category | Industries |
|----------|------------|
| 🍽️ Food | restaurant, pizza, bakery, coffeeshop, sushi, fastfood, icecream |
| 💆 Health | medical, dental, salon, spa, massage, nailsalon, optician, podiatrist, pharmacy, vet |
| 🔧 Services | cleaning, electrician, plumber, landscaping, locksmith, moving, garage |
| 💼 Professional | lawyer, realestate, tutoring, drivingschool |
| 🎉 Lifestyle | hotel, gym, florist, photography, tattoo, petgrooming, petboarding, daycare, wedding, eventvenue |

## 📄 License

MIT
