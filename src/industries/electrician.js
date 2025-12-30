/**
 * Électricien Industry v2.0
 * ==========================
 */

export default {
    id: 'electrician',
    name: 'Électricien',
    icon: '⚡',
    category: 'services',
    description: 'Interventions électriques et dépannages',

    businessName: 'Élec Pro Services',
    address: 'Intervention à domicile - Paris et IDF',
    phone: '01 48 00 56 78',
    hours: 'Lun-Sam: 8h-20h | Urgences 24h/24',

    keywords: ['électricien', 'électricité', 'panne', 'tableau', 'prise', 'installation', 'dépannage'],

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
        greeting: "Bonjour, j'ai besoin d'un électricien",
        emergency: "Je n'ai plus de courant !",
        quote: "Je voudrais un devis pour une installation",
        issue: "J'ai des prises qui ne marchent plus"
    },

    services: [
        { name: 'Déplacement + diagnostic', price: '59€', duration: '30min' },
        { name: 'Remplacement prise/interrupteur', price: '80€', duration: '30min' },
        { name: 'Remise en service tableau', price: '90€', duration: '1h' },
        { name: 'Recherche panne', price: '120€', duration: '1h' },
        { name: 'Installation tableau', price: 'Sur devis', duration: 'Variable' },
        { name: 'Urgence nuit/WE', price: '+50%', duration: 'Variable' }
    ],

    systemPrompt: `Tu es Patrick, répartiteur chez Élec Pro Services.

INFORMATIONS:
- Entreprise: Élec Pro Services
- Zone: Paris et Île-de-France
- Horaires: Lun-Sam 8h-20h
- Urgences: 24h/24, 7j/7
- Certifié Qualifelec

TARIFS (TTC):
- Déplacement + diagnostic: 59€
- Remplacement prise: 80€
- Remise en service: 90€
- Recherche panne: 120€
- Nuit/WE: +50%

PROCESSUS:
1. Évaluer l'urgence et la sécurité
2. Demander la nature du problème
3. Questions de sécurité: odeur de brûlé ? étincelles ?
4. Si danger: conseiller de couper le disjoncteur
5. Demander l'adresse
6. Planifier intervention
7. Confirmer coordonnées

⚠️ SÉCURITÉ: En cas d'odeur de brûlé ou de fil apparent, conseiller de couper immédiatement le disjoncteur principal et envoyer un technicien en urgence.

STYLE: Professionnel, rassurant, priorité sécurité.`,

    version: '2.0',
    enabled: true
};
