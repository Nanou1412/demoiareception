/**
 * Pension Animaux Industry v2.0
 * ==============================
 */

export default {
    id: 'petboarding',
    name: 'Pension animaux',
    icon: '🏠',
    category: 'services',
    description: 'Réservation de pension pour animaux',

    businessName: 'Le Paradis des Animaux',
    address: '12 Chemin des Bois, 77700 Serris',
    phone: '01 60 43 12 34',
    hours: 'Tous les jours: 8h-19h',

    keywords: ['pension', 'garde', 'chien', 'chat', 'vacances', 'hébergement', 'animaux'],

    capabilities: {
        appointments: true,
        pricing: true,
        hours: true,
        complaints: true,
        emergencies: true,
        orders: false,
        productInfo: true
    },

    quickMessages: {
        greeting: 'Bonjour, je cherche une pension pour mon animal',
        availability: 'Avez-vous de la place pour cet été ?',
        visit: 'Peut-on visiter avant de réserver ?',
        pricing: 'Quels sont vos tarifs ?'
    },

    services: [
        { name: 'Pension chien (par nuit)', price: '25-35€', duration: 'Nuit' },
        { name: 'Pension chat (par nuit)', price: '18€', duration: 'Nuit' },
        { name: 'Pension NAC', price: 'Sur devis', duration: 'Nuit' },
        { name: 'Promenade supplémentaire', price: '10€', duration: '30min' },
        { name: 'Câlins VIP', price: '15€/jour', duration: 'Journée' },
        { name: 'Visite découverte', price: 'Gratuit', duration: '30min' }
    ],

    systemPrompt: `Tu es Marie, gérante du Paradis des Animaux.

INFORMATIONS:
- Pension: Le Paradis des Animaux
- Adresse: 12 Chemin des Bois, 77700 Serris (30min de Paris)
- Horaires dépôt/reprise: 8h-19h tous les jours
- Capacité: 30 chiens, 20 chats

TARIFS PAR NUIT:
Chiens:
- Petit (<10kg): 25€/nuit
- Moyen (10-25kg): 30€/nuit
- Grand (>25kg): 35€/nuit
- 2ème animal même famille: -15%

Chats: 18€/nuit (box individuel)

OPTIONS:
- Promenade supplémentaire: +10€/jour
- Câlins VIP (temps privilégié): +15€/jour

PROCESSUS:
1. Type d'animal et race
2. Dates de séjour (arrivée et départ)
3. Vaccins à jour? (obligatoires: rage, toux du chenil pour chiens)
4. Besoins particuliers (alimentation, médicaments)
5. Proposer visite gratuite avant réservation
6. Acompte 30% à la réservation

VISITE: Fortement conseillée, gratuite et sans engagement

HAUTE SAISON: Réserver 2-3 mois à l'avance (été, Noël)

STYLE: Passionnée des animaux, rassurante. Les propriétaires doivent partir l'esprit tranquille.`,

    version: '2.0',
    enabled: true
};
