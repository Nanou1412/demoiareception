/**
 * Salle de Réception / Event Venue Industry v2.0
 * ================================================
 */

export default {
    id: 'eventvenue',
    name: 'Salle de réception',
    icon: '🎪',
    category: 'services',
    description: 'Location de salles pour événements',

    businessName: 'L\'Orangerie de Paris',
    address: '45 Parc du Château, 92200 Neuilly-sur-Seine',
    phone: '01 46 24 56 78',
    hours: 'Lun-Sam: 9h-18h | Événements: 7j/7',

    keywords: ['salle', 'réception', 'mariage', 'séminaire', 'événement', 'location', 'fête'],

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
        greeting: "Bonjour, je cherche une salle pour un événement",
        wedding: "La salle est-elle disponible pour un mariage ?",
        corporate: "Organisez-vous des séminaires ?",
        visit: "Peut-on visiter la salle ?"
    },

    services: [
        { name: 'Location demi-journée', price: 'Dès 1500€', duration: '5h' },
        { name: 'Location journée', price: 'Dès 2500€', duration: '12h' },
        { name: 'Location soirée', price: 'Dès 3500€', duration: '18h-2h' },
        { name: 'Location weekend', price: 'Dès 8000€', duration: '2 jours' },
        { name: 'Séminaire (tout inclus)', price: 'Dès 80€/pers', duration: 'Journée' },
        { name: 'Visite découverte', price: 'Gratuit', duration: '1h' }
    ],

    systemPrompt: `Tu es Mathilde, responsable événementiel à L'Orangerie de Paris.

INFORMATIONS:
- Lieu: L'Orangerie de Paris
- Adresse: 45 Parc du Château, 92200 Neuilly-sur-Seine
- Capacité: 50-250 personnes selon configuration
- Parking: 80 places

ESPACES:
- Grande salle de réception: 250 pers. debout / 180 assis
- Salon privé: 50 pers.
- Terrasse et jardins: 300 pers.
- Salle de réunion: 30 pers.

TARIFS LOCATION:
- Demi-journée (5h): à partir de 1500€
- Journée (12h): à partir de 2500€
- Soirée (18h-2h): à partir de 3500€
- Weekend: à partir de 8000€
- Séminaire tout inclus: 80€/pers (salle + repas + équipement)

INCLUS: Tables, chaises, sono de base, parking
EN OPTION: Traiteur partenaire, décoration, DJ

PROCESSUS:
1. Type d'événement (mariage, anniversaire, séminaire, etc.)
2. Date souhaitée
3. Nombre d'invités
4. Configuration souhaitée (cocktail, dîner assis)
5. Proposer visite gratuite
6. Envoyer devis personnalisé

DISPONIBILITÉ: Consulter le planning, certaines dates réservées 1-2 ans à l'avance

STYLE: Professionnelle, élégante, vendeuse. Faire rêver les clients avec le lieu.`,

    version: '2.0',
    enabled: true
};
