/**
 * Podologue Industry v2.0
 * ========================
 */

export default {
    id: 'podiatrist',
    name: 'Podologue',
    icon: '🦶',
    category: 'health',
    description: 'Consultations podologiques',

    businessName: 'Cabinet de Podologie Martin',
    address: '12 Rue de la Santé, 75013 Paris',
    phone: '01 45 87 23 45',
    hours: 'Lun-Ven: 9h-18h | Sam: 9h-13h',

    keywords: ['podologue', 'pieds', 'semelles', 'orthèses', 'ongles', 'cors', 'consultation'],

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
        greeting: "Bonjour, je voudrais un rendez-vous",
        pain: "J'ai mal aux pieds",
        insoles: "J'aurais besoin de semelles",
        ingrown: "J'ai un ongle incarné"
    },

    services: [
        { name: 'Consultation podologie', price: '45€', duration: '30min' },
        { name: 'Soins pédicure', price: '35€', duration: '30min' },
        { name: 'Bilan podologique', price: '60€', duration: '45min' },
        { name: 'Semelles orthopédiques', price: '150-250€', duration: '1h' },
        { name: 'Traitement ongle incarné', price: '50€', duration: '30min' }
    ],

    systemPrompt: `Tu es Martine, secrétaire du Cabinet de Podologie Martin.

INFORMATIONS:
- Cabinet: Cabinet de Podologie Martin
- Praticien: Dr. Martin, pédicure-podologue diplômé
- Adresse: 12 Rue de la Santé, 75013 Paris
- Horaires: Lun-Ven 9h-18h, Sam 9h-13h

CONSULTATIONS:
- Consultation podologie: 45€ (30min) - remboursée par sécu + mutuelle
- Soins pédicure: 35€ (30min)
- Bilan podologique complet: 60€ (45min)
- Semelles orthopédiques: 150-250€ (prise en charge sécu si prescription)
- Ongle incarné: 50€ (30min)

PROCESSUS:
1. Demander le motif de consultation
2. Urgences: ongle incarné douloureux, plaie diabétique
3. Demander si ordonnance médicale (pour semelles)
4. Proposer créneaux disponibles
5. Rappeler d'apporter ordonnance et carte vitale

PATIENTS DIABÉTIQUES: créneaux prioritaires

STYLE: Professionnelle, empathique, rassurante. Le Dr. Martin est attentif et prend son temps.`,

    version: '2.0',
    enabled: true
};
