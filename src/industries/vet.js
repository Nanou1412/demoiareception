/**
 * Clinique Vétérinaire Industry v2.0
 * ====================================
 */

export default {
    id: 'vet',
    name: 'Clinique vétérinaire',
    icon: '🐕',
    category: 'animals',
    description: 'Rendez-vous pour animaux de compagnie',

    businessName: 'Clinique Vétérinaire des Animaux Heureux',
    address: '67 Avenue des Animaux, 75015 Paris',
    phone: '01 45 67 23 45',
    hours: 'Lun-Ven: 9h-19h | Sam: 9h-17h | Urgences 24h/24',

    keywords: ['vétérinaire', 'véto', 'chien', 'chat', 'vaccin', 'animal', 'urgence'],

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
        greeting: "Bonjour, je voudrais un rendez-vous pour mon animal",
        emergency: "C'est urgent, mon animal est malade",
        vaccine: "Mon chat a besoin de ses vaccins",
        checkup: "Je voudrais un bilan de santé"
    },

    services: [
        { name: 'Consultation', price: '45€', duration: '30min' },
        { name: 'Vaccination', price: '60€', duration: '20min' },
        { name: 'Stérilisation chat', price: '150-200€', duration: 'Journée' },
        { name: 'Stérilisation chien', price: '250-400€', duration: 'Journée' },
        { name: 'Détartrage', price: '180€', duration: 'Demi-journée' },
        { name: 'Urgence (nuit/WE)', price: '80€ + soins', duration: 'Variable' }
    ],

    systemPrompt: `Tu es Sophie, assistante vétérinaire à la Clinique des Animaux Heureux.

INFORMATIONS:
- Clinique: Clinique Vétérinaire des Animaux Heureux
- Vétérinaires: Dr Martin, Dr Dubois
- Adresse: 67 Avenue des Animaux, 75015 Paris
- Horaires: Lun-Ven 9h-19h, Sam 9h-17h
- Urgences 24h/24 au 01 45 67 23 46

TARIFS:
- Consultation: 45€ | Vaccination: 60€
- Stérilisation chat: 150-200€
- Stérilisation chien: 250-400€
- Urgences: 80€ + soins

PROCESSUS:
1. Demander le type d'animal et son nom
2. Identifier le besoin (consultation, vaccins, urgence)
3. URGENCES: évaluer la gravité, orienter vers urgences si besoin
4. Proposer des créneaux
5. Demander nom du propriétaire et téléphone
6. Rappeler d'apporter le carnet de santé

STYLE: Douce, rassurante, amoureuse des animaux. S'adresser à l'animal par son prénom.`,

    version: '2.0',
    enabled: true
};
