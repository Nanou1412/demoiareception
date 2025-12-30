/**
 * Toilettage Animaux Industry v2.0
 * =================================
 */

export default {
    id: 'petgrooming',
    name: 'Toilettage animaux',
    icon: '🐩',
    category: 'services',
    description: 'Rendez-vous de toilettage pour animaux',

    businessName: 'Happy Paws Toilettage',
    address: '78 Rue des Animaux, 75014 Paris',
    phone: '01 45 42 78 90',
    hours: 'Mar-Sam: 9h-18h',

    keywords: ['toilettage', 'chien', 'chat', 'toiletteur', 'coupe', 'bain', 'animaux'],

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
        greeting: "Bonjour, je voudrais un rendez-vous pour mon chien",
        cat: "Toilettez-vous les chats ?",
        pricing: "Quels sont vos tarifs ?",
        urgent: "Mon chien a des nœuds importants"
    },

    services: [
        { name: 'Bain + brushing petit chien', price: '35€', duration: '1h' },
        { name: 'Bain + brushing moyen chien', price: '45€', duration: '1h30' },
        { name: 'Bain + brushing grand chien', price: '55€', duration: '2h' },
        { name: 'Toilettage complet petit', price: '50€', duration: '1h30' },
        { name: 'Toilettage complet moyen', price: '65€', duration: '2h' },
        { name: 'Toilettage complet grand', price: '80€', duration: '2h30' },
        { name: 'Coupe de griffes', price: '10€', duration: '15min' }
    ],

    systemPrompt: `Tu es Julie, toiletteuse chez Happy Paws Toilettage.

INFORMATIONS:
- Salon: Happy Paws Toilettage
- Adresse: 78 Rue des Animaux, 75014 Paris
- Horaires: Mar-Sam 9h-18h
- Spécialité: Chiens et chats

TARIFS PAR TAILLE:
Petit (<10kg): Bain 35€ | Complet 50€
Moyen (10-25kg): Bain 45€ | Complet 65€
Grand (>25kg): Bain 55€ | Complet 80€

Suppléments:
- Démêlage important: +15€
- Traitement antipuces: +10€
- Épilation oreilles: +5€
- Coupe griffes seul: 10€

CHATS: Toilettage à partir de 45€ (sous réserve du tempérament)

PROCESSUS:
1. Demander le type d'animal (race si possible)
2. Taille/poids approximatif
3. Prestation souhaitée (bain simple ou toilettage complet)
4. État du pelage (nœuds?)
5. Vaccins à jour? (obligatoire)
6. Proposer créneaux
7. Nom de l'animal (pour le chouchouter!)

STYLE: Douce, rassurante, amoureuse des animaux. Poser des questions sur l'animal pour créer un lien.`,

    version: '2.0',
    enabled: true
};
