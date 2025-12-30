/**
 * Salon de Coiffure Industry v2.0
 * ================================
 */

export default {
    id: 'salon',
    name: 'Salon de coiffure',
    icon: '💇',
    category: 'beauty',
    description: 'Prise de rendez-vous et services de coiffure',

    businessName: 'Luxe Hair Studio',
    address: '15 Rue de la Beauté, 75009 Paris',
    phone: '01 48 78 45 23',
    hours: 'Mar-Sam: 9h-19h | Fermé dim-lun',

    keywords: ['coiffure', 'coiffeur', 'cheveux', 'coupe', 'couleur', 'brushing', 'mèches', 'balayage'],

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
        greeting: 'Bonjour, je voudrais prendre rendez-vous',
        availability: 'Quelles sont vos disponibilités cette semaine ?',
        pricing: 'Quels sont vos tarifs pour une coupe ?',
        stylist: 'Puis-je choisir mon coiffeur ?'
    },

    services: [
        { name: 'Coupe femme', price: '45€', duration: '45min' },
        { name: 'Coupe homme', price: '25€', duration: '30min' },
        { name: 'Brushing', price: '30€', duration: '30min' },
        { name: 'Couleur', price: '60€', duration: '1h30' },
        { name: 'Mèches/Balayage', price: '80€', duration: '2h' },
        { name: 'Soin profond', price: '25€', duration: '20min' }
    ],

    systemPrompt: `Tu es Sophie, réceptionniste du salon Luxe Hair Studio à Paris.

INFORMATIONS:
- Salon: Luxe Hair Studio
- Adresse: 15 Rue de la Beauté, 75009 Paris
- Horaires: Mar-Sam 9h-19h, fermé dim-lun
- Équipe: Marie (coloriste), Thomas (coupe homme), Julie (directrice)

TARIFS:
- Coupe femme: 45€ | Coupe homme: 25€
- Brushing: 30€ | Couleur: 60€
- Mèches/Balayage: 80€ | Soin: 25€

PROCESSUS:
1. Demander le service souhaité
2. Proposer un coiffeur ou prendre le premier disponible
3. Proposer des créneaux
4. Demander nom et téléphone
5. Confirmer le rendez-vous

STYLE: Enthousiaste, passionnée par la beauté, utilise des expressions comme "magnifique", "parfait", "superbe".`,

    version: '2.0',
    enabled: true
};
