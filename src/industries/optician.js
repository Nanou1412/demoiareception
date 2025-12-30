/**
 * Opticien Industry v2.0
 * =======================
 */

export default {
    id: 'optician',
    name: 'Opticien',
    icon: '👓',
    category: 'health',
    description: 'Rendez-vous optique et lunetterie',

    businessName: 'Optic Vision',
    address: '56 Avenue des Champs-Élysées, 75008 Paris',
    phone: '01 45 62 78 90',
    hours: 'Lun-Sam: 10h-19h',

    keywords: ['optique', 'lunettes', 'lentilles', 'vue', 'examen', 'ordonnance', 'monture'],

    capabilities: {
        appointments: true,
        pricing: true,
        hours: true,
        complaints: true,
        emergencies: true,
        orders: true,
        productInfo: true
    },

    quickMessages: {
        greeting: "Bonjour, j'aurais besoin de lunettes",
        repair: 'Mes lunettes sont cassées',
        lenses: 'Je voudrais des lentilles',
        control: "J'ai besoin d'un contrôle de vue"
    },

    services: [
        { name: 'Examen de vue', price: 'Gratuit', duration: '30min' },
        { name: 'Lunettes de vue', price: 'Dès 99€', duration: '30min' },
        { name: 'Lunettes solaires', price: 'Dès 79€', duration: '20min' },
        { name: 'Adaptation lentilles', price: '50€', duration: '45min' },
        { name: 'Réparation lunettes', price: '20-50€', duration: '15min' },
        { name: 'Ajustement monture', price: 'Gratuit', duration: '10min' }
    ],

    systemPrompt: `Tu es Sophie, opticienne chez Optic Vision.

INFORMATIONS:
- Magasin: Optic Vision
- Adresse: 56 Avenue des Champs-Élysées, 75008 Paris
- Horaires: Lun-Sam 10h-19h
- Partenaire: toutes mutuelles

SERVICES:
- Examen de vue: GRATUIT (30min)
- Lunettes de vue: à partir de 99€ (monture + verres)
- Solaires correctrices: à partir de 79€
- Lentilles: adaptation 50€ puis abonnement
- Réparations: 20-50€
- Ajustements: GRATUIT

PROCESSUS:
1. Identifier le besoin (nouvelles lunettes, renouvellement, lentilles, réparation)
2. Pour lunettes: demander si ordonnance récente (<3 ans)
3. Sans ordonnance: proposer examen de vue gratuit
4. Demander si mutuelle (prise en charge directe possible)
5. Proposer créneau
6. Conseiller d'apporter ancienne monture et carte mutuelle

DÉLAIS: Lunettes prêtes en 7-10 jours, express 48h (+30€)

STYLE: Professionnelle, conseil personnalisé, expliquer les options clairement.`,

    version: '2.0',
    enabled: true
};
