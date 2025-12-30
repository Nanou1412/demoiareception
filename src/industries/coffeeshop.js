/**
 * Café/Coffee Shop Industry v2.0
 * ===============================
 */

export default {
    id: 'coffeeshop',
    name: 'Café',
    icon: '☕',
    category: 'restaurant',
    description: 'Commandes et réservations café',

    businessName: 'Le Petit Grain',
    address: '23 Rue du Commerce, 75015 Paris',
    phone: '01 45 79 12 34',
    hours: 'Lun-Ven: 7h30-19h | Sam-Dim: 9h-18h',

    keywords: ['café', 'coffee', 'brunch', 'latte', 'cappuccino', 'viennoiseries', 'petit-déjeuner'],

    capabilities: {
        appointments: true,
        pricing: true,
        hours: true,
        complaints: true,
        emergencies: false,
        orders: true,
        productInfo: true
    },

    quickMessages: {
        greeting: 'Bonjour, je voudrais commander',
        menu: 'Quels cafés proposez-vous ?',
        brunch: 'Faites-vous le brunch ?',
        takeaway: 'Puis-je commander à emporter ?'
    },

    services: [
        { name: 'Espresso', price: '2,50€', duration: '5min' },
        { name: 'Cappuccino', price: '4,50€', duration: '5min' },
        { name: 'Latte', price: '4,50€', duration: '5min' },
        { name: 'Croissant', price: '1,80€', duration: '2min' },
        { name: 'Avocado Toast', price: '12€', duration: '10min' },
        { name: 'Brunch (WE)', price: '25€', duration: '15min' }
    ],

    systemPrompt: `Tu es Léa, barista au Petit Grain.

INFORMATIONS:
- Café: Le Petit Grain - Coffee shop artisanal
- Adresse: 23 Rue du Commerce, 75015 Paris
- Horaires: Lun-Ven 7h30-19h, Sam-Dim 9h-18h
- Wifi gratuit, coin travail

BOISSONS:
- Espresso: 2,50€
- Lungo: 3€
- Cappuccino: 4,50€
- Latte: 4,50€
- Flat White: 4,50€
- Matcha Latte: 5€
- Chocolat chaud: 4€
- Thé: 3,50€
- Jus frais: 5€

FOOD:
- Croissant: 1,80€
- Pain au chocolat: 2€
- Avocado toast: 12€
- Granola bowl: 9€
- Cookies: 3€
- Brunch (WE uniquement): 25€

COMMANDES À EMPORTER: oui
RÉSERVATION BRUNCH: conseillée le weekend

PROCESSUS COMMANDE:
1. Prendre la commande boisson
2. Proposer viennoiserie/food
3. Sur place ou à emporter?
4. Donner le total
5. Confirmer (prêt dans 5-10min)

STYLE: Cool, décontractée, passionnée de café. Tutoiement possible si client jeune.`,

    version: '2.0',
    enabled: true
};
