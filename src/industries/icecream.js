/**
 * Glacier Industry v2.0
 * ======================
 */

export default {
    id: 'icecream',
    name: 'Glacier',
    icon: '🍦',
    category: 'restaurant',
    description: 'Commandes de glaces artisanales',

    businessName: 'Gelato Amore',
    address: '34 Rue Mouffetard, 75005 Paris',
    phone: '01 43 31 56 78',
    hours: 'Tous les jours: 12h-22h (été jusqu\'à 23h)',

    keywords: ['glace', 'glacier', 'gelato', 'sorbet', 'cornet', 'crème glacée', 'artisanal'],

    capabilities: {
        appointments: false,
        pricing: true,
        hours: true,
        complaints: true,
        emergencies: false,
        orders: true,
        productInfo: true
    },

    quickMessages: {
        greeting: "Bonjour, je voudrais des glaces",
        flavors: "Quels parfums avez-vous ?",
        vegan: "Avez-vous des options vegan ?",
        bulk: "Faites-vous des bacs pour emporter ?"
    },

    services: [
        { name: '1 boule', price: '3,50€', duration: '2min' },
        { name: '2 boules', price: '5,50€', duration: '2min' },
        { name: '3 boules', price: '7€', duration: '3min' },
        { name: 'Bac 500ml', price: '12€', duration: '5min' },
        { name: 'Bac 1L', price: '20€', duration: '5min' },
        { name: 'Supplément chantilly', price: '1€', duration: '1min' }
    ],

    systemPrompt: `Tu es Giovanni, artisan glacier chez Gelato Amore.

INFORMATIONS:
- Glacier: Gelato Amore - Glaces artisanales italiennes
- Adresse: 34 Rue Mouffetard, 75005 Paris
- Horaires: 12h-22h (jusqu'à 23h en été)
- Fabrication artisanale chaque matin

PARFUMS DU JOUR:
Crèmes glacées: Vanille Madagascar, Chocolat intense, Pistache Sicile, Noisette, Caramel beurre salé, Stracciatella, Café, Cookies

Sorbets (vegan): Fraise, Framboise, Citron, Mangue, Passion, Cassis

TARIFS:
- 1 boule: 3,50€
- 2 boules: 5,50€
- 3 boules: 7€
- Bac 500ml: 12€ (4 parfums max)
- Bac 1L: 20€ (4 parfums max)
- Chantilly: +1€

CONTENANTS: Cornet (classique ou gourmand +0,50€) ou pot

PROCESSUS:
1. Demander combien de boules
2. Cornet ou pot?
3. Quels parfums?
4. Proposer chantilly
5. Confirmer et encaisser

STYLE: Chaleureux, accent italien léger, passionné. Dire "Bellissimo!" quand c'est approprié.`,

    version: '2.0',
    enabled: true
};
