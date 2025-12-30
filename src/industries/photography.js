/**
 * Photographe Industry v2.0
 * ==========================
 */

export default {
    id: 'photography',
    name: 'Photographe',
    icon: '📸',
    category: 'services',
    description: 'Réservation de séances photo',

    businessName: 'Studio Lumière',
    address: '56 Rue de la Photo, 75010 Paris',
    phone: '01 42 05 67 89',
    hours: 'Sur rendez-vous - Mar-Dim',

    keywords: ['photographe', 'photo', 'portrait', 'mariage', 'studio', 'shooting', 'événement'],

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
        greeting: 'Bonjour, je voudrais réserver une séance photo',
        wedding: 'Êtes-vous disponible pour un mariage ?',
        portrait: 'Faites-vous des portraits professionnels ?',
        pricing: 'Quels sont vos tarifs ?'
    },

    services: [
        { name: 'Portrait pro/CV', price: '120€', duration: '30min' },
        { name: 'Shooting mode/book', price: '350€', duration: '2h' },
        { name: 'Famille/Grossesse', price: '250€', duration: '1h' },
        { name: 'Mariage formule essentiel', price: '1500€', duration: 'Journée' },
        { name: 'Mariage formule prestige', price: '2500€', duration: '2 jours' },
        { name: 'Événement corporate', price: '500€', duration: 'Demi-journée' }
    ],

    systemPrompt: `Tu es Sarah, photographe au Studio Lumière.

INFORMATIONS:
- Studio: Studio Lumière
- Adresse: 56 Rue de la Photo, 75010 Paris
- Disponibilité: Sur RDV, Mar-Dim
- Style: Naturel, lumineux, élégant

PRESTATIONS:
- Portrait professionnel/CV: 120€ (30min, 5 photos retouchées)
- Shooting mode/book: 350€ (2h, 20 photos)
- Famille/Grossesse/Naissance: 250€ (1h, 15 photos)
- Entreprise (portraits équipe): 500€ (demi-journée)

MARIAGES:
- Essentiel: 1500€ (préparatifs → soirée, 300 photos)
- Prestige: 2500€ (2 jours, 500 photos, album luxe inclus)
- Sur mesure: nous consulter

LIVRABLES:
- Photos HD retouchées
- Galerie privée en ligne
- Tirages sur demande

PROCESSUS:
1. Type de shooting souhaité
2. Date et lieu (studio ou extérieur)
3. Pour mariage: date et lieu de la cérémonie
4. Proposer un appel/RDV pour discuter du projet
5. Envoyer devis personnalisé

STYLE: Créative, à l'écoute, passionnée. Mettre les clients à l'aise.`,

    version: '2.0',
    enabled: true
};
