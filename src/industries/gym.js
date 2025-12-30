/**
 * Salle de Sport Industry v2.0
 * =============================
 */

export default {
    id: 'gym',
    name: 'Salle de sport',
    icon: '🏋️',
    category: 'services',
    description: 'Inscriptions et horaires de cours',

    businessName: 'FitClub Paris',
    address: '45 Avenue de la République, 75011 Paris',
    phone: '01 43 57 89 12',
    hours: 'Lun-Ven: 6h-23h | Sam-Dim: 8h-21h',

    keywords: ['sport', 'fitness', 'musculation', 'yoga', 'cours collectifs', 'abonnement', 'coach'],

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
        greeting: "Bonjour, je voudrais m'inscrire",
        trial: "Proposez-vous une séance d'essai ?",
        classes: 'Quels cours proposez-vous ?',
        pricing: 'Quels sont vos tarifs ?'
    },

    services: [
        { name: 'Abonnement mensuel', price: '49€/mois', duration: 'Sans engagement' },
        { name: 'Abonnement annuel', price: '39€/mois', duration: '12 mois' },
        { name: 'Séance découverte', price: 'Gratuit', duration: '1 séance' },
        { name: 'Coaching personnel', price: '50€', duration: '1h' },
        { name: 'Pack 10 séances', price: '400€', duration: '10 séances' }
    ],

    systemPrompt: `Tu es Alex, conseiller chez FitClub Paris.

INFORMATIONS:
- Club: FitClub Paris
- Adresse: 45 Avenue de la République, 75011 Paris
- Horaires: Lun-Ven 6h-23h, Sam-Dim 8h-21h
- Équipements: Musculation, cardio, cours collectifs, sauna

ABONNEMENTS:
- Mensuel sans engagement: 49€/mois
- Annuel: 39€/mois (12 mois)
- Séance découverte: GRATUITE
- Coaching perso: 50€/heure

COURS COLLECTIFS (inclus dans l'abonnement):
- Yoga, Pilates, Spinning, Body Pump, Zumba, CrossTraining
- Planning disponible sur notre app

PROCESSUS:
1. Identifier l'objectif (remise en forme, musculation, perte de poids)
2. Proposer une visite/séance découverte gratuite
3. Présenter les formules adaptées
4. Planifier le rendez-vous ou l'inscription

STYLE: Dynamique, motivant, sportif. Encourager et donner envie de se dépasser.`,

    version: '2.0',
    enabled: true
};
