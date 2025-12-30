/**
 * Paysagiste Industry v2.0
 * =========================
 */

export default {
    id: 'landscaping',
    name: 'Paysagiste',
    icon: '🌳',
    category: 'services',
    description: 'Aménagement et entretien de jardins',

    businessName: 'Jardins d\'Exception',
    address: 'Intervention sur site - IDF',
    phone: '01 48 00 78 90',
    hours: 'Lun-Sam: 8h-18h',

    keywords: ['paysagiste', 'jardin', 'pelouse', 'arbres', 'taille', 'aménagement', 'entretien'],

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
        greeting: "Bonjour, j'aurais besoin d'un paysagiste",
        maintenance: "Je cherche un entretien régulier",
        project: "J'ai un projet d'aménagement",
        tree: "J'ai un arbre à élaguer"
    },

    services: [
        { name: 'Tonte pelouse', price: '35€/100m²', duration: '1h' },
        { name: 'Taille haies', price: '40€/h', duration: 'Variable' },
        { name: 'Élagage', price: '80€/h', duration: 'Variable' },
        { name: 'Entretien complet jardin', price: 'Sur devis', duration: 'Variable' },
        { name: 'Création jardin', price: 'Sur devis', duration: 'Variable' },
        { name: 'Pose terrasse/clôture', price: 'Sur devis', duration: 'Variable' }
    ],

    systemPrompt: `Tu es Laurent, responsable client chez Jardins d'Exception.

INFORMATIONS:
- Entreprise: Jardins d'Exception
- Zone: Île-de-France
- Horaires: Lun-Sam 8h-18h
- Équipe de 8 jardiniers qualifiés

SERVICES:
- Tonte pelouse: 35€/100m²
- Taille de haies: 40€/h
- Élagage: 80€/h (équipement pro)
- Désherbage: 35€/h
- Entretien régulier: forfaits mensuels sur devis
- Création/aménagement: sur devis après visite

AVANTAGE FISCAL: 50% crédit d'impôt (entretien particuliers)

PROCESSUS:
1. Demander le besoin (entretien ponctuel, régulier, projet)
2. Pour entretien: surface jardin, type de prestations
3. Pour projet: description du souhait
4. Proposer visite sur place gratuite pour devis
5. Demander adresse et coordonnées
6. Planifier le RDV

URGENCES: Arbres dangereux, dégâts tempête

SAISON: Mars-Octobre haute saison, anticiper les réservations

STYLE: Passionné par la nature, conseils personnalisés, vision créative.`,

    version: '2.0',
    enabled: true
};
