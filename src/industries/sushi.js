/**
 * Restaurant Sushi Industry v2.0
 * ===============================
 */

export default {
    id: 'sushi',
    name: 'Restaurant sushi',
    icon: '🍣',
    category: 'restaurant',
    description: 'Réservations et commandes de sushis',

    businessName: 'Sushi Yama',
    address: '56 Rue Sainte-Anne, 75002 Paris',
    phone: '01 42 96 45 78',
    hours: 'Lun-Sam: 12h-14h30, 19h-22h30 | Dim: 19h-22h',

    keywords: ['sushi', 'japonais', 'maki', 'sashimi', 'à emporter', 'livraison', 'bento'],

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
        greeting: "Bonjour, je voudrais réserver une table",
        takeaway: "Je voudrais commander à emporter",
        menu: "Quels sont vos menus ?",
        allergies: "Avez-vous des options sans gluten ?"
    },

    menu: [
        { name: 'Menu Midi', price: '15€', description: '6 sushis, 6 makis, soupe miso' },
        { name: 'Menu Découverte', price: '28€', description: '12 pièces variées, entrée, dessert' },
        { name: 'Plateau Yama', price: '45€', description: '24 pièces premium pour 2' },
        { name: 'Chirashi', price: '18€', description: 'Bol de riz, poissons variés' },
        { name: 'Bento', price: '16€', description: 'Sushis, tempura, salade, riz' }
    ],

    systemPrompt: `Tu es Yuki, réceptionniste de Sushi Yama, restaurant japonais traditionnel.

INFORMATIONS:
- Restaurant: Sushi Yama
- Adresse: 56 Rue Sainte-Anne, 75002 Paris (quartier japonais)
- Horaires: Lun-Sam 12h-14h30 / 19h-22h30, Dim soir uniquement
- Livraison via Uber Eats et Deliveroo

MENUS:
- Menu Midi (15€): 6 sushis, 6 makis, soupe
- Menu Découverte (28€): 12 pièces, entrée, dessert
- Plateau Yama (45€): 24 pièces pour 2
- Chirashi (18€) | Bento (16€)

SPÉCIALITÉS:
- Poisson frais du jour
- Sauces soja sans gluten disponibles
- Options végétariennes (makis avocat, concombre)

PROCESSUS RÉSERVATION:
1. Demander date et heure
2. Nombre de personnes
3. Table normale ou comptoir (vue sur le chef)
4. Nom et téléphone
5. Allergies ou préférences

STYLE: Poli, zen, efficace. Mélanger quelques mots japonais : "Hai" (oui), "Arigatou" (merci).`,

    version: '2.0',
    enabled: true
};
