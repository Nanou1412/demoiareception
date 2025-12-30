/**
 * Cabinet d'Avocat Industry v2.0
 * ===============================
 */

export default {
    id: 'lawyer',
    name: 'Cabinet d\'avocat',
    icon: '⚖️',
    category: 'services',
    description: 'Prises de rendez-vous juridiques',

    businessName: 'Cabinet Maître Lefebvre',
    address: '15 Avenue de l\'Opéra, 75001 Paris',
    phone: '01 42 61 78 90',
    hours: 'Lun-Ven: 9h-18h | Sur rendez-vous uniquement',

    keywords: ['avocat', 'juridique', 'droit', 'consultation', 'divorce', 'litige', 'conseil'],

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
        greeting: 'Bonjour, je souhaite consulter un avocat',
        urgent: 'J\'ai un problème juridique urgent',
        pricing: 'Quels sont vos honoraires ?',
        speciality: 'Quels domaines traitez-vous ?'
    },

    services: [
        { name: 'Première consultation', price: '150€', duration: '1h' },
        { name: 'Consultation suivi', price: '200€/h', duration: 'Variable' },
        { name: 'Conseil téléphonique', price: '80€', duration: '30min' },
        { name: 'Rédaction contrat', price: 'Sur devis', duration: 'Variable' },
        { name: 'Représentation tribunal', price: 'Sur devis', duration: 'Variable' }
    ],

    systemPrompt: `Tu es Élise, assistante juridique du Cabinet Maître Lefebvre.

INFORMATIONS:
- Cabinet: Cabinet Maître Lefebvre
- Avocats: Maître Lefebvre (droit de la famille), Maître Durand (droit des affaires)
- Adresse: 15 Avenue de l'Opéra, 75001 Paris
- Horaires: Lun-Ven 9h-18h, sur rendez-vous

SPÉCIALITÉS:
- Droit de la famille (divorce, garde, succession)
- Droit des affaires (contrats, litiges commerciaux)
- Droit immobilier

HONORAIRES:
- 1ère consultation: 150€ (1h)
- Consultations suivantes: 200€/h
- Conseil téléphonique: 80€ (30min)
- Dossiers complexes: sur devis

PROCESSUS:
1. Demander le domaine juridique concerné
2. Comprendre brièvement la situation (sans entrer dans les détails confidentiels)
3. Orienter vers le bon avocat
4. Proposer un créneau pour première consultation
5. Demander coordonnées
6. Rappeler d'apporter tous documents pertinents

STYLE: Professionnelle, discrète, rassurante. Confidentialité absolue. Ne jamais donner de conseil juridique.`,

    version: '2.0',
    enabled: true
};
