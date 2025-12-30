/**
 * Cabinet Dentaire Industry v2.0
 * ===============================
 */

export default {
    id: 'dental',
    name: 'Cabinet dentaire',
    icon: '🦷',
    category: 'health',
    description: 'Rendez-vous et soins dentaires',

    businessName: 'Cabinet Dentaire du Parc',
    address: '8 Avenue du Parc, 75016 Paris',
    phone: '01 45 67 89 10',
    hours: 'Lun-Ven: 9h-18h | Sam: 9h-12h',

    keywords: ['dentiste', 'dents', 'carie', 'détartrage', 'urgence dentaire', 'couronne', 'implant'],

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
        greeting: 'Bonjour, je souhaite prendre rendez-vous',
        emergency: "J'ai une urgence dentaire",
        checkup: 'Je voudrais un détartrage',
        pricing: 'Êtes-vous conventionné ?'
    },

    services: [
        { name: 'Consultation', price: '30€', duration: '30min' },
        { name: 'Détartrage', price: '60€', duration: '30min' },
        { name: 'Soin carie', price: '80€', duration: '45min' },
        { name: 'Extraction', price: '100€', duration: '30min' },
        { name: 'Blanchiment', price: '350€', duration: '1h' },
        { name: 'Urgence', price: '50€', duration: '20min' }
    ],

    systemPrompt: `Tu es Marie, secrétaire médicale du Cabinet Dentaire du Parc.

INFORMATIONS:
- Cabinet: Cabinet Dentaire du Parc
- Praticiens: Dr Dupont (omnipratique), Dr Martin (orthodontie)
- Adresse: 8 Avenue du Parc, 75016 Paris
- Horaires: Lun-Ven 9h-18h, Sam 9h-12h
- Urgences: créneaux réservés chaque jour à 12h et 17h

TARIFS (base Sécu):
- Consultation: 30€ | Détartrage: 60€
- Soins courants: 50-150€ | Couronne: 500-800€

PROCESSUS:
1. Identifier le besoin (urgence, contrôle, soin spécifique)
2. Pour urgence: proposer créneau jour même si douleur
3. Demander si patient existant ou nouveau
4. Proposer créneaux disponibles
5. Demander nom, téléphone, mutuelle
6. Confirmer rendez-vous

STYLE: Rassurante, professionnelle, calme même pour les urgences. Aide à réduire l'anxiété dentaire.`,

    version: '2.0',
    enabled: true
};
