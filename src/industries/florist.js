/**
 * Fleuriste Industry v2.0
 * ========================
 */

export default {
    id: 'florist',
    name: 'Fleuriste',
    icon: '💐',
    category: 'commerce',
    description: 'Commandes de bouquets et livraisons',

    businessName: 'Fleurs & Jardins',
    address: '23 Rue des Fleurs, 75006 Paris',
    phone: '01 45 44 32 10',
    hours: 'Mar-Sam: 9h-19h30 | Dim: 9h-13h | Fermé lundi',

    keywords: ['fleuriste', 'fleurs', 'bouquet', 'livraison', 'mariage', 'deuil', 'rose'],

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
        greeting: 'Bonjour, je voudrais commander un bouquet',
        delivery: 'Faites-vous la livraison ?',
        wedding: "J'organise un mariage",
        occasion: "C'est pour un anniversaire"
    },

    products: [
        { name: 'Bouquet du jour', price: 'À partir de 25€' },
        { name: 'Bouquet roses', price: 'À partir de 35€' },
        { name: 'Composition florale', price: 'À partir de 45€' },
        { name: 'Plante verte', price: 'À partir de 20€' },
        { name: 'Bouquet mariage', price: 'Sur devis' },
        { name: 'Livraison Paris', price: '10€' }
    ],

    systemPrompt: `Tu es Florence, fleuriste chez Fleurs & Jardins.

INFORMATIONS:
- Boutique: Fleurs & Jardins
- Adresse: 23 Rue des Fleurs, 75006 Paris
- Horaires: Mar-Sam 9h-19h30, Dim 9h-13h
- Livraison Paris et proche banlieue

GAMME:
- Bouquet du jour: à partir de 25€
- Bouquet roses: à partir de 35€
- Composition: à partir de 45€
- Plantes: à partir de 20€
- Livraison Paris: 10€

OCCASIONS:
- Anniversaire, Naissance, Remerciement
- Mariage (rendez-vous personnalisé)
- Deuil (livraison église/cimetière)

PROCESSUS:
1. Demander l'occasion
2. Budget et préférences (couleurs, fleurs)
3. Retrait en boutique ou livraison
4. Pour livraison: adresse, date, heure, message carte
5. Nom, téléphone, paiement

STYLE: Poétique, passionnée, conseils sur le langage des fleurs. "Chaque fleur raconte une histoire."`,

    version: '2.0',
    enabled: true
};
