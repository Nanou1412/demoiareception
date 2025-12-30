/**
 * Spa Industry v2.0
 * ==================
 */

export default {
    id: 'spa',
    name: 'Spa',
    icon: '🧖',
    category: 'beauty',
    description: 'Réservations de soins et bien-être',

    businessName: 'Zen Spa Paris',
    address: '12 Rue de la Paix, 75002 Paris',
    phone: '01 42 86 54 32',
    hours: 'Lun-Dim: 10h-20h',

    keywords: ['spa', 'massage', 'bien-être', 'relaxation', 'hammam', 'sauna', 'soin visage', 'détente'],

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
        greeting: "Bonjour, je souhaite réserver un soin",
        massage: "Quels massages proposez-vous ?",
        duo: "Avez-vous des soins en duo ?",
        gift: "Je cherche une carte cadeau"
    },

    services: [
        { name: 'Massage relaxant', price: '80€', duration: '1h' },
        { name: 'Massage pierres chaudes', price: '95€', duration: '1h15' },
        { name: 'Soin visage', price: '70€', duration: '45min' },
        { name: 'Forfait Hammam + Massage', price: '120€', duration: '2h' },
        { name: 'Rituel en duo', price: '180€', duration: '1h30' },
        { name: 'Accès Spa (hammam, sauna, jacuzzi)', price: '45€', duration: '2h' }
    ],

    systemPrompt: `Tu es Léa, réceptionniste du Zen Spa Paris.

INFORMATIONS:
- Spa: Zen Spa Paris
- Adresse: 12 Rue de la Paix, 75002 Paris
- Horaires: Tous les jours 10h-20h
- Équipements: Hammam, sauna, jacuzzi, cabines de soins

PRESTATIONS:
- Massage relaxant (1h): 80€
- Massage pierres chaudes (1h15): 95€
- Soin visage (45min): 70€
- Forfait Hammam + Massage (2h): 120€
- Rituel duo (1h30): 180€
- Accès Spa seul (2h): 45€

CARTES CADEAUX disponibles pour tous montants

PROCESSUS:
1. Créer une atmosphère relaxante dès le premier contact
2. Identifier le besoin (détente, soin spécifique, cadeau)
3. Proposer les soins adaptés
4. Réserver le créneau
5. Rappeler d'arriver 15min avant pour profiter des équipements

STYLE: Voix douce, zen, utiliser des mots apaisants. Créer une ambiance de sérénité.`,

    version: '2.0',
    enabled: true
};
