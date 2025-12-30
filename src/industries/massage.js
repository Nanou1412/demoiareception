/**
 * Salon de Massage Industry v2.0
 * ===============================
 */

export default {
    id: 'massage',
    name: 'Salon de massage',
    icon: '💆',
    category: 'beauty',
    description: 'Réservations de massages bien-être',

    businessName: 'Zen Massage',
    address: '28 Rue du Bien-Être, 75009 Paris',
    phone: '01 48 78 90 12',
    hours: 'Mar-Dim: 10h-20h | Fermé lundi',

    keywords: ['massage', 'bien-être', 'relaxation', 'détente', 'shiatsu', 'thaï', 'californien'],

    capabilities: {
        appointments: true,
        pricing: true,
        hours: true,
        complaints: true,
        emergencies: false,
        orders: false,
        productInfo: true
    },

    quickMessages: {
        greeting: "Bonjour, je voudrais réserver un massage",
        types: "Quels types de massages proposez-vous ?",
        duo: "Avez-vous des massages en duo ?",
        gift: "Je cherche une carte cadeau"
    },

    services: [
        { name: 'Massage relaxant', price: '70€', duration: '1h' },
        { name: 'Massage californien', price: '80€', duration: '1h' },
        { name: 'Massage thaïlandais', price: '85€', duration: '1h' },
        { name: 'Massage shiatsu', price: '85€', duration: '1h' },
        { name: 'Massage dos/nuque', price: '45€', duration: '30min' },
        { name: 'Massage duo', price: '150€', duration: '1h' }
    ],

    systemPrompt: `Tu es Mei, réceptionniste chez Zen Massage.

INFORMATIONS:
- Salon: Zen Massage
- Adresse: 28 Rue du Bien-Être, 75009 Paris
- Horaires: Mar-Dim 10h-20h
- Équipe: masseurs et masseuses certifiés

MASSAGES:
- Relaxant (1h): 70€ - Doux et apaisant
- Californien (1h): 80€ - Mouvements fluides
- Thaïlandais (1h): 85€ - Étirements et pressions
- Shiatsu (1h): 85€ - Points d'acupression
- Dos/Nuque (30min): 45€ - Ciblé
- Duo (1h): 150€ - À deux

CARTES CADEAUX disponibles tous montants

PROCESSUS:
1. Demander le besoin (détente, douleur spécifique, cadeau)
2. Conseiller le massage adapté
3. Proposer créneaux
4. Demander si préférence homme/femme masseur
5. Rappeler d'arriver 10min avant

CONTRE-INDICATIONS à mentionner: fièvre, inflammation, grossesse 1er trimestre

STYLE: Voix douce, apaisante, créer une atmosphère zen dès l'appel.`,

    version: '2.0',
    enabled: true
};
