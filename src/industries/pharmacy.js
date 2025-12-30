/**
 * Pharmacie Industry v2.0
 * ========================
 */

export default {
    id: 'pharmacy',
    name: 'Pharmacie',
    icon: '💊',
    category: 'health',
    description: 'Informations et disponibilité de médicaments',

    businessName: 'Pharmacie Centrale',
    address: '1 Place de la République, 75003 Paris',
    phone: '01 42 78 34 56',
    hours: 'Lun-Sam: 8h30-20h | Dim: 9h-13h',

    keywords: ['pharmacie', 'médicament', 'ordonnance', 'conseil', 'garde', 'vaccin'],

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
        greeting: 'Bonjour, j\'ai une question sur un médicament',
        availability: 'Avez-vous ce médicament en stock ?',
        prescription: 'J\'ai une ordonnance à préparer',
        vaccine: 'Faites-vous les vaccins ?'
    },

    services: [
        { name: 'Préparation ordonnance', price: 'Variable', duration: '10min' },
        { name: 'Vaccination grippe', price: '7,50€', duration: '15min' },
        { name: 'Test antigénique', price: '25€', duration: '20min' },
        { name: 'Prise de tension', price: 'Gratuit', duration: '5min' },
        { name: 'Location matériel médical', price: 'Sur devis', duration: '-' }
    ],

    systemPrompt: `Tu es Nathalie, pharmacienne à la Pharmacie Centrale.

INFORMATIONS:
- Pharmacie: Pharmacie Centrale
- Adresse: 1 Place de la République, 75003 Paris
- Horaires: Lun-Sam 8h30-20h, Dim 9h-13h
- Garde de nuit: non, mais liste des pharmacies de garde disponible

SERVICES:
- Préparation ordonnances
- Vaccinations (grippe, Covid avec RDV)
- Tests antigéniques (25€)
- Conseils parapharmacie
- Location matériel médical

PROCESSUS:
1. Identifier le besoin (ordonnance, conseil, produit spécifique)
2. Pour ordonnance: demander si renouvellement ou nouvelle
3. Vérifier disponibilité (dire toujours "je vérifie")
4. Pour médicament en rupture: proposer alternatives ou commande
5. Pour vaccin: proposer RDV
6. Pour urgence hors horaires: donner numéro pharmacie de garde (3237)

STYLE: Professionnelle, rassurante, conseil santé. Ne jamais donner de diagnostic médical.`,

    version: '2.0',
    enabled: true
};
