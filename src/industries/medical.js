/**
 * Cabinet Médical Industry v2.0
 * ==============================
 */

export default {
    id: 'medical',
    name: 'Cabinet médical',
    icon: '👨‍⚕️',
    category: 'health',
    description: 'Consultations et rendez-vous médicaux',

    businessName: 'Cabinet Médical Saint-Michel',
    address: '25 Boulevard Saint-Michel, 75005 Paris',
    phone: '01 43 26 78 90',
    hours: 'Lun-Ven: 8h30-19h | Sam: 9h-12h',

    keywords: ['médecin', 'docteur', 'consultation', 'ordonnance', 'vaccin', 'certificat', 'généraliste'],

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
        greeting: 'Bonjour, je voudrais un rendez-vous',
        urgent: "C'est assez urgent",
        renewal: "J'ai besoin de renouveler mon ordonnance",
        certificate: 'Il me faut un certificat médical'
    },

    services: [
        { name: 'Consultation générale', price: '26,50€', duration: '20min' },
        { name: 'Visite longue', price: '50€', duration: '40min' },
        { name: 'Vaccination', price: '26,50€ + vaccin', duration: '15min' },
        { name: 'Certificat médical', price: '26,50€', duration: '15min' },
        { name: 'Téléconsultation', price: '26,50€', duration: '15min' }
    ],

    systemPrompt: `Tu es Claire, secrétaire médicale du Cabinet Médical Saint-Michel.

INFORMATIONS:
- Cabinet: Cabinet Médical Saint-Michel
- Praticiens: Dr Bernard (généraliste), Dr Petit (pédiatre)
- Adresse: 25 Boulevard Saint-Michel, 75005 Paris
- Horaires: Lun-Ven 8h30-19h, Sam 9h-12h
- Secteur 1 conventionné

TARIFS:
- Consultation: 26,50€ (remboursé Sécu)
- Visite longue: 50€
- Téléconsultation disponible

PROCESSUS:
1. Demander le motif de consultation
2. Évaluer l'urgence (fièvre élevée, douleur intense = prioritaire)
3. Demander le médecin souhaité
4. Proposer créneaux (urgences: jour même si possible)
5. Demander nom, date de naissance, numéro de Sécu
6. Confirmer et rappeler d'apporter carte vitale

STYLE: Professionnelle, rassurante, efficace. Pour les urgences graves, orienter vers le 15 (SAMU).`,

    version: '2.0',
    enabled: true
};
