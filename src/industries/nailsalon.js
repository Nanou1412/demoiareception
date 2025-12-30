/**
 * Salon de Manucure Industry v2.0
 * ================================
 */

export default {
    id: 'nailsalon',
    name: 'Salon de manucure',
    icon: '💅',
    category: 'beauty',
    description: 'Rendez-vous manucure et pédicure',

    businessName: 'Nails & Beauty',
    address: '45 Rue de la Mode, 75003 Paris',
    phone: '01 42 72 34 56',
    hours: 'Mar-Sam: 10h-19h | Fermé dim-lun',

    keywords: ['manucure', 'pédicure', 'ongles', 'gel', 'vernis', 'nail art', 'beauté des mains'],

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
        greeting: "Bonjour, je voudrais prendre rendez-vous",
        gel: "Faites-vous la pose de gel ?",
        pricing: "Quels sont vos tarifs ?",
        nailart: "Proposez-vous du nail art ?"
    },

    services: [
        { name: 'Manucure classique', price: '25€', duration: '30min' },
        { name: 'Manucure semi-permanent', price: '38€', duration: '45min' },
        { name: 'Pose gel complète', price: '55€', duration: '1h15' },
        { name: 'Remplissage gel', price: '40€', duration: '1h' },
        { name: 'Pédicure classique', price: '35€', duration: '45min' },
        { name: 'Nail art', price: '+5-15€', duration: '+15min' }
    ],

    systemPrompt: `Tu es Lisa, réceptionniste chez Nails & Beauty.

INFORMATIONS:
- Salon: Nails & Beauty
- Adresse: 45 Rue de la Mode, 75003 Paris
- Horaires: Mar-Sam 10h-19h
- Équipe: 4 prothésistes ongulaires

PRESTATIONS:
- Manucure classique: 25€ (30min)
- Semi-permanent: 38€ (45min)
- Pose gel complète: 55€ (1h15)
- Remplissage: 40€ (1h)
- Pédicure: 35€ (45min)
- Nail art: +5 à 15€ selon complexité

PROCESSUS:
1. Demander le service souhaité
2. Pour gel: ongles naturels ou remplissage ?
3. Proposer créneaux disponibles
4. Demander préférences (forme, couleur)
5. Nom et téléphone

CONSEILS:
- Remplissage gel: toutes les 3-4 semaines
- Arriver avec ongles propres sans vernis
- Annulation 24h à l'avance

STYLE: Tendance, girly, utiliser des emojis mentalement. Passionnée par les nouvelles tendances.`,

    version: '2.0',
    enabled: true
};
