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
├── src/                    # Source files (Vite)
│   ├── index.html         # Landing page
│   ├── demo.html          # Demo page
│   ├── css/               # Modular CSS
│   │   ├── main.css       # Entry point
│   │   ├── base/          # Reset, typography, variables
│   │   ├── components/    # Buttons, cards, forms, modals
│   │   ├── layout/        # Grid, header
│   │   └── pages/         # Landing, demo styles
│   ├── js/                # Modular JavaScript (ES Modules)
│   │   ├── main.js        # Landing page entry
│   │   ├── demo.js        # Demo page entry
│   │   ├── core/          # Config, state, events, utils
│   │   ├── services/      # API, audio, speech, industries
│   │   └── ui/            # Phone, modal, toast, templates
│   └── industries/        # 38 industry configs (ESM)
│
├── industries/            # Netlify bridge (CommonJS)
│   └── index.cjs          # getSystemPrompt(), getVoice()
│
├── netlify/functions/     # Serverless functions
│   ├── chat.cjs           # Main chat API
│   ├── chat-tts.cjs       # TTS API
│   └── chat-reset.cjs     # Reset conversation
│
├── dist/                  # Build output (generated)
├── vite.config.js         # Vite configuration
├── netlify.toml           # Netlify config
└── package.json           # Dependencies
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

# Copy environment file
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start development server
npm run dev
```

Open http://localhost:5173

### Build for production

```bash
npm run build
npm run preview
```

## 📝 Adding a New Industry

1. Create `/src/industries/newindustry.js`:

```javascript
export default {
    id: 'newindustry',
    name: 'New Industry',
    icon: '🆕',
    category: 'services',
    description: 'Description of the industry',
    
    businessName: 'Business Name',
    address: '123 Street, City',
    phone: '01 23 45 67 89',
    hours: 'Mon-Fri: 9h-18h',
    
    capabilities: {
        appointments: true,
        pricing: true,
        hours: true
    },
    
    scenarios: {
        booking: {
            enabled: true,
            label: 'Réservation',
            icon: '📅'
        }
    },
    
    systemPrompt: `Tu es l'assistant virtuel de [Business]...`,
    
    version: '2.0',
    enabled: true
};
```

2. Add to `/src/industries/index.js`:

```javascript
import newindustry from './newindustry.js';
// Add to industries object
```

3. Add to `/industries/index.cjs` (for Netlify):

```javascript
// Add prompt and voice in systemPrompts and voices objects
```

4. Rebuild:

```bash
npm run build
```

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

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Fix ESLint issues |
| `npm run format` | Format with Prettier |
| `npm run clean` | Remove dist folder |

## 📄 License

MIT
