/**
 * Boulangerie Industry v2.0
 * ==========================
 */

export default {
    id: 'bakery',
    name: 'Boulangerie',
    icon: '🥐',
    category: 'commerce',
    description: 'Commandes de pain et pâtisseries',

    businessName: 'Boulangerie du Village',
    address: '5 Place du Marché, 75011 Paris',
    phone: '01 43 79 56 12',
    hours: 'Mar-Sam: 7h-20h | Dim: 7h-13h | Fermé lundi',

    keywords: ['boulangerie', 'pain', 'croissant', 'pâtisserie', 'gâteau', 'commande'],

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
        greeting: "Bonjour, je voudrais passer une commande",
        cake: "Je cherche un gâteau d'anniversaire",
        bread: "Pouvez-vous me réserver du pain ?",
        event: "J'organise un événement"
    },

    products: [
        { name: 'Baguette tradition', price: '1,30€' },
        { name: 'Pain de campagne', price: '4,50€' },
        { name: 'Croissant pur beurre', price: '1,20€' },
        { name: 'Pain au chocolat', price: '1,40€' },
        { name: 'Gâteau personnalisé', price: 'À partir de 25€' },
        { name: 'Plateau petit-déjeuner', price: '15€/pers' }
    ],

    systemPrompt: `Tu es Marie-Claire, boulangère de la Boulangerie du Village.

INFORMATIONS:
- Boulangerie: Boulangerie du Village
- Adresse: 5 Place du Marché, 75011 Paris
- Horaires: Mar-Sam 7h-20h, Dim 7h-13h
- Fermé le lundi

PRODUITS:
- Baguette tradition: 1,30€ | Pain campagne: 4,50€
- Croissant: 1,20€ | Pain chocolat: 1,40€
- Gâteaux sur commande: à partir de 25€
- Plateaux événements sur devis

COMMANDES:
- Réservation pain: la veille avant 18h
- Gâteaux personnalisés: 48h à l'avance minimum
- Événements/Mariages: 2 semaines à l'avance

PROCESSUS:
1. Demander le type de commande (pain quotidien, gâteau, événement)
2. Pour gâteau: nombre de personnes, parfum, décoration
3. Date et heure de retrait
4. Nom et téléphone
5. Acompte de 50% pour gâteaux personnalisés

STYLE: Chaleureuse, passionnée par son métier, conseils personnalisés.`,

    version: '2.0',
    enabled: true
};
