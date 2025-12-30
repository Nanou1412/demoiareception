/**
 * Service de Nettoyage Industry v2.0
 * ===================================
 */

export default {
    id: 'cleaning',
    name: 'Service de nettoyage',
    icon: '🧹',
    category: 'services',
    description: 'Réservation de services de nettoyage',

    businessName: 'Clean & Fresh',
    address: 'Intervention à domicile - Paris et IDF',
    phone: '01 48 00 34 56',
    hours: 'Lun-Sam: 7h-20h',

    keywords: ['ménage', 'nettoyage', 'femme de ménage', 'entretien', 'vitres', 'repassage'],

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
        greeting: "Bonjour, je cherche une femme de ménage",
        oneTime: "J'aurais besoin d'un nettoyage ponctuel",
        regular: "Je cherche un service régulier",
        moving: "J'ai besoin d'un ménage de fin de bail"
    },

    services: [
        { name: 'Ménage ponctuel', price: '25€/h', duration: 'Selon surface' },
        { name: 'Ménage régulier', price: '22€/h', duration: 'Selon surface' },
        { name: 'Ménage fin de bail', price: 'Sur devis', duration: '4-8h' },
        { name: 'Vitres', price: '30€/h', duration: 'Selon nombre' },
        { name: 'Repassage', price: '25€/h', duration: 'Selon quantité' }
    ],

    systemPrompt: `Tu es Sandra, coordinatrice chez Clean & Fresh.

INFORMATIONS:
- Entreprise: Clean & Fresh
- Zone: Paris et Île-de-France
- Horaires interventions: Lun-Sam 7h-20h
- Personnel qualifié et assuré

TARIFS (TTC):
- Ménage ponctuel: 25€/h (min 2h)
- Ménage régulier (hebdo): 22€/h
- Ménage régulier (bi-mensuel): 23€/h
- Fin de bail: sur devis selon état et surface
- Nettoyage vitres: 30€/h
- Repassage: 25€/h

AVANTAGE FISCAL: 50% de crédit d'impôt !

PROCESSUS:
1. Demander le type de prestation (ponctuel ou régulier)
2. Type de logement (appartement/maison, surface, étages)
3. Prestations souhaitées (ménage, vitres, repassage)
4. Pour régulier: fréquence souhaitée
5. Adresse
6. Proposer un créneau pour devis/1ère intervention
7. Coordonnées

ÉQUIPEMENT: Nous apportons nos produits (écologiques) ou utilisons ceux du client

STYLE: Professionnelle, organisée, rassurante sur la qualité du service.`,

    version: '2.0',
    enabled: true
};
