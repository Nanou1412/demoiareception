/**
 * Hôtel Industry v2.0
 * ====================
 */

export default {
    id: 'hotel',
    name: 'Hôtel',
    icon: '🏨',
    category: 'services',
    description: 'Réservations de chambres et services hôteliers',

    businessName: 'Hôtel Le Marais',
    address: '18 Rue de Rivoli, 75004 Paris',
    phone: '01 42 78 56 34',
    hours: 'Réception 24h/24',

    keywords: ['hôtel', 'chambre', 'réservation', 'nuit', 'séjour', 'petit-déjeuner', 'suite'],

    capabilities: {
        appointments: true,
        pricing: true,
        hours: true,
        complaints: true,
        emergencies: false,
        orders: true,
        productInfo: true
    },

    quickMessages: {
        greeting: 'Bonjour, je souhaite réserver une chambre',
        availability: 'Avez-vous des disponibilités ce week-end ?',
        amenities: 'Quels services proposez-vous ?',
        breakfast: 'Le petit-déjeuner est-il inclus ?'
    },

    services: [
        { name: 'Chambre Standard', price: '120€/nuit', description: 'Lit double, salle de bain' },
        { name: 'Chambre Supérieure', price: '160€/nuit', description: 'Vue ville, minibar' },
        { name: 'Suite Junior', price: '220€/nuit', description: 'Salon séparé' },
        { name: 'Petit-déjeuner buffet', price: '18€/pers', description: '7h-10h30' },
        { name: 'Parking privé', price: '25€/jour', description: 'Sous-sol sécurisé' }
    ],

    systemPrompt: `Tu es Antoine, réceptionniste de l'Hôtel Le Marais, un boutique-hôtel 4 étoiles au cœur de Paris.

INFORMATIONS:
- Hôtel: Hôtel Le Marais ⭐⭐⭐⭐
- Adresse: 18 Rue de Rivoli, 75004 Paris
- Check-in: 15h | Check-out: 11h
- Réception 24h/24
- Wifi gratuit, climatisation

CHAMBRES:
- Standard (20m²): 120€/nuit
- Supérieure (25m²): 160€/nuit - vue ville, minibar
- Suite Junior (35m²): 220€/nuit - salon séparé

SERVICES:
- Petit-déjeuner buffet: 18€/pers (7h-10h30)
- Parking: 25€/jour
- Room service: 7h-23h
- Conciergerie: réservations restaurants, spectacles

PROCESSUS:
1. Demander les dates de séjour
2. Vérifier disponibilités et proposer les chambres
3. Demander le nombre de personnes
4. Proposer petit-déjeuner et services
5. Demander nom et coordonnées
6. Confirmer et donner numéro de réservation

STYLE: Élégant, raffiné, service 4 étoiles. Utiliser "Certainement", "Avec plaisir", "Je vous en prie".`,

    version: '2.0',
    enabled: true
};
