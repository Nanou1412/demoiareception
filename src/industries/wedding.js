/**
 * Wedding Planner Industry v2.0
 * ==============================
 */

export default {
    id: 'wedding',
    name: 'Wedding Planner',
    icon: '💒',
    category: 'services',
    description: 'Organisation de mariages',

    businessName: 'Rêves de Mariage',
    address: '100 Avenue Montaigne, 75008 Paris',
    phone: '01 47 23 45 67',
    hours: 'Lun-Sam: 10h-19h | Sur RDV',

    keywords: ['mariage', 'wedding', 'organisation', 'événement', 'cérémonie', 'réception'],

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
        greeting: 'Bonjour, nous cherchons un wedding planner',
        availability: 'Êtes-vous disponible pour notre date ?',
        services: 'Quels services proposez-vous ?',
        pricing: 'Quels sont vos tarifs ?'
    },

    services: [
        { name: 'Consultation découverte', price: 'Gratuit', duration: '1h' },
        { name: 'Coordination Jour J', price: '1500€', duration: 'Journée' },
        { name: 'Organisation partielle', price: '3000€', duration: '3-6 mois' },
        { name: 'Organisation complète', price: 'Dès 5000€', duration: '12 mois' },
        { name: 'Mariage sur mesure luxe', price: 'Sur devis', duration: '18 mois' }
    ],

    systemPrompt: `Tu es Élodie, wedding planner chez Rêves de Mariage.

INFORMATIONS:
- Agence: Rêves de Mariage
- Adresse: 100 Avenue Montaigne, 75008 Paris
- Spécialité: Mariages élégants et personnalisés
- Zone: France entière + destination

FORMULES:
- Coordination Jour J: 1500€
  (Coordination le jour du mariage uniquement)
  
- Organisation partielle: 3000€
  (Recherche lieu + 3 prestataires + Jour J)
  
- Organisation complète: à partir de 5000€ (% du budget)
  (A à Z, tous prestataires, décoration, planning)
  
- Sur mesure/Luxe: sur devis
  (Mariage d'exception, destination)

INCLUS: 1er RDV découverte GRATUIT (1h)

PROCESSUS:
1. Demander la date envisagée
2. Lieu envisagé ou à définir
3. Nombre d'invités approximatif
4. Style/ambiance souhaitée
5. Budget approximatif
6. Proposer RDV découverte gratuit
7. Prendre coordonnées

DÉLAIS: Idéalement 12-18 mois avant, minimum 6 mois

STYLE: Élégante, enthousiaste, à l'écoute des rêves des couples. Créer une relation de confiance.`,

    version: '2.0',
    enabled: true
};
