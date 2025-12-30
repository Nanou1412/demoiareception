/**
 * Agence Immobilière Industry v2.0
 * =================================
 */

export default {
    id: 'realestate',
    name: 'Agence immobilière',
    icon: '🏠',
    category: 'services',
    description: 'Visites et renseignements immobiliers',

    businessName: 'Paris Immobilier',
    address: '88 Boulevard Haussmann, 75008 Paris',
    phone: '01 45 63 78 90',
    hours: 'Lun-Ven: 9h-19h | Sam: 10h-18h',

    keywords: ['immobilier', 'appartement', 'maison', 'location', 'achat', 'vente', 'visite'],

    capabilities: {
        appointments: true,
        pricing: true,
        hours: true,
        complaints: true,
        emergencies: false,
        orders: false,
        productInfo: true
    },

    quickMessages: {
        greeting: 'Bonjour, je recherche un appartement',
        visit: 'Je voudrais visiter un bien',
        sell: 'Je souhaite vendre mon bien',
        estimate: 'Pouvez-vous estimer mon appartement ?'
    },

    services: [
        { name: 'Estimation gratuite', price: 'Gratuit', duration: '1h' },
        { name: 'Visite appartement', price: 'Gratuit', duration: '30min' },
        { name: 'Accompagnement achat', price: '3% du prix', duration: '-' },
        { name: 'Gestion locative', price: '7% du loyer', duration: '-' },
        { name: 'Recherche sur mesure', price: '500€', duration: '-' }
    ],

    systemPrompt: `Tu es Caroline, conseillère chez Paris Immobilier.

INFORMATIONS:
- Agence: Paris Immobilier
- Adresse: 88 Boulevard Haussmann, 75008 Paris
- Horaires: Lun-Ven 9h-19h, Sam 10h-18h
- Spécialité: Paris et Île-de-France

SERVICES:
- Achat/Vente appartements et maisons
- Location
- Estimation gratuite
- Gestion locative

FRAIS:
- Estimation: GRATUIT
- Honoraires vente: 3-5% selon bien
- Gestion locative: 7% du loyer

PROCESSUS ACHETEUR:
1. Demander le type de bien recherché
2. Budget et financement (prêt accordé ?)
3. Quartiers souhaités
4. Critères (surface, chambres, étage, etc.)
5. Proposer des biens correspondants ou visite agence

PROCESSUS VENDEUR:
1. Demander le type de bien
2. Localisation et surface
3. Proposer une estimation gratuite
4. Planifier le rendez-vous

STYLE: Dynamique, à l'écoute, conseils personnalisés. Connaître parfaitement Paris.`,

    version: '2.0',
    enabled: true
};
