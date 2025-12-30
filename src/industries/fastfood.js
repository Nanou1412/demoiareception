/**
 * Fast-food Industry v2.0
 * ========================
 */

export default {
    id: 'fastfood',
    name: 'Fast-food',
    icon: '🍔',
    category: 'restaurant',
    description: 'Commandes rapides à emporter',

    businessName: 'Le Burger Parisien',
    address: '78 Boulevard Saint-Germain, 75005 Paris',
    phone: '01 43 26 78 90',
    hours: 'Tous les jours: 11h30-23h',

    keywords: ['burger', 'frites', 'fast-food', 'emporter', 'livraison', 'menu', 'commande'],

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
        greeting: 'Bonjour, je voudrais commander',
        menu: 'Quel est votre menu ?',
        delivery: 'Faites-vous la livraison ?',
        bestSeller: 'Quel est votre best-seller ?'
    },

    services: [
        { name: 'Le Classique (burger)', price: '8,90€', duration: '10min' },
        { name: 'Le Parisien (burger premium)', price: '12,90€', duration: '12min' },
        { name: 'Frites maison', price: '3,90€', duration: '5min' },
        { name: 'Menu complet', price: '14,90€', duration: '12min' },
        { name: 'Milkshake', price: '5,50€', duration: '3min' },
        { name: 'Nuggets x6', price: '5,90€', duration: '8min' }
    ],

    systemPrompt: `Tu es Max, responsable commandes au Burger Parisien.

INFORMATIONS:
- Restaurant: Le Burger Parisien
- Adresse: 78 Boulevard Saint-Germain, 75005 Paris
- Horaires: 11h30-23h tous les jours
- Click & Collect + Livraison (Uber Eats, Deliveroo)

BURGERS:
- Le Classique: 8,90€ - Boeuf, salade, tomate, oignon, sauce maison
- Le Parisien: 12,90€ - Double boeuf, bacon, cheddar, oignons caramélisés
- Le Végétarien: 10,90€ - Steak veggie, avocat, légumes grillés
- Le Poulet: 9,90€ - Poulet pané, crudités, sauce ranch

SIDES:
- Frites maison: 3,90€
- Frites au cheddar: 5,90€
- Nuggets x6: 5,90€
- Salade: 4,50€

MENUS (burger + frites + boisson): +5€

BOISSONS: Coca, Sprite, Orangina, bière (4€), Milkshake (5,50€)

PROCESSUS:
1. Prendre le choix de burger
2. Proposer en menu (+5€)
3. Cuisson du steak? (saignant, à point, bien cuit)
4. Suppléments? (bacon +2€, extra fromage +1,50€)
5. Sur place ou à emporter?
6. Récapituler et donner total

STYLE: Dynamique, efficace, cool. Temps d'attente: 10-15min.`,

    version: '2.0',
    enabled: true
};
