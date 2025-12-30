/**
 * Restaurant Industry v2.0
 * ========================
 * 
 * Configuration complète pour les restaurants
 */

export default {
    // ============================================
    // IDENTIFICATION
    // ============================================
    id: 'restaurant',
    name: 'Restaurant',
    icon: '🍽️',
    category: 'restaurant',
    description: 'Réservations de tables et informations pour restaurants',

    // ============================================
    // INFORMATIONS BUSINESS
    // ============================================
    businessName: 'Le Bistrot Parisien',
    address: '42 Avenue des Champs-Élysées, 75008 Paris',
    phone: '01 42 56 78 90',
    hours: 'Mar-Dim: 12h-14h30, 19h-22h30 | Fermé le lundi',
    website: 'www.bistrot-parisien.fr',

    // ============================================
    // MOTS-CLÉS
    // ============================================
    keywords: [
        'restaurant',
        'réservation',
        'table',
        'dîner',
        'déjeuner',
        'menu',
        'gastronomie',
        'cuisine',
        'chef',
        'repas'
    ],

    // ============================================
    // CAPACITÉS
    // ============================================
    capabilities: {
        appointments: true,
        pricing: true,
        hours: true,
        complaints: true,
        emergencies: false,
        orders: true,
        productInfo: true
    },

    // ============================================
    // MESSAGES RAPIDES
    // ============================================
    quickMessages: {
        greeting: "Bonjour, je souhaite réserver une table",
        availability: "Avez-vous des disponibilités ce soir ?",
        menu: "Quel est votre menu du jour ?",
        allergies: "Proposez-vous des options végétariennes ?",
        group: "Je voudrais réserver pour un groupe",
        cancel: "Je dois annuler ma réservation"
    },

    // ============================================
    // SCÉNARIOS
    // ============================================
    scenarios: {
        reservation: {
            enabled: true,
            label: 'Réservation',
            icon: '📅',
            description: 'Réserver une table',
            suggestedQuestions: [
                "Je voudrais réserver pour 4 personnes samedi soir",
                "Avez-vous une table en terrasse ?",
                "C'est pour un anniversaire"
            ]
        },
        information: {
            enabled: true,
            label: 'Information',
            icon: 'ℹ️',
            description: 'Informations générales',
            suggestedQuestions: [
                "Quel est le menu du jour ?",
                "Avez-vous un menu enfant ?",
                "Quels sont vos horaires ?"
            ]
        },
        complaint: {
            enabled: true,
            label: 'Réclamation',
            icon: '😤',
            description: 'Signaler un problème',
            suggestedQuestions: [
                "J'ai eu un problème lors de ma dernière visite",
                "L'attente était trop longue",
                "Je n'ai pas été satisfait du service"
            ]
        },
        takeaway: {
            enabled: true,
            label: 'À emporter',
            icon: '🥡',
            description: 'Commande à emporter',
            suggestedQuestions: [
                "Je voudrais commander à emporter",
                "Faites-vous la livraison ?",
                "Quel est le délai de préparation ?"
            ]
        }
    },

    // ============================================
    // MENUS
    // ============================================
    menus: {
        midi: {
            name: 'Menu Déjeuner',
            price: '28€',
            description: 'Entrée + Plat ou Plat + Dessert',
            items: [
                'Entrée du jour',
                'Plat du jour',
                'Dessert maison'
            ]
        },
        soir: {
            name: 'Menu Découverte',
            price: '55€',
            description: 'Entrée + Plat + Fromage + Dessert',
            items: [
                'Amuse-bouche',
                'Entrée au choix',
                'Plat au choix',
                'Sélection de fromages',
                'Dessert au choix'
            ]
        },
        degustation: {
            name: 'Menu Dégustation',
            price: '85€',
            description: '7 plats signatures du chef',
            items: [
                'Surprise du chef en 7 services',
                'Accord mets et vins disponible (+35€)'
            ]
        }
    },

    // ============================================
    // SPÉCIALITÉS
    // ============================================
    specialties: [
        'Foie gras maison',
        'Risotto aux truffes',
        'Entrecôte de bœuf Wagyu',
        'Sole meunière',
        'Tarte Tatin'
    ],

    // ============================================
    // OPTIONS DIÉTÉTIQUES
    // ============================================
    dietaryOptions: [
        'Options végétariennes',
        'Menu sans gluten sur demande',
        'Allergies prises en compte',
        'Menu enfant disponible'
    ],

    // ============================================
    // ÉQUIPEMENTS
    // ============================================
    amenities: [
        'Terrasse',
        'Salle privée (jusqu\'à 20 personnes)',
        'Climatisation',
        'Accès PMR',
        'Wifi gratuit',
        'Voiturier le soir'
    ],

    // ============================================
    // PROMPT SYSTÈME
    // ============================================
    systemPrompt: `Tu es l'assistant virtuel du restaurant "Le Bistrot Parisien", un restaurant gastronomique situé sur les Champs-Élysées à Paris.

RÔLE:
Tu es le réceptionniste téléphonique du restaurant. Tu accueilles les clients avec chaleur et professionnalisme, prends les réservations et réponds aux questions sur l'établissement.

INFORMATIONS SUR LE RESTAURANT:
- Nom: Le Bistrot Parisien
- Type: Restaurant gastronomique français
- Adresse: 42 Avenue des Champs-Élysées, 75008 Paris
- Téléphone: 01 42 56 78 90
- Chef: Jean-Pierre Dubois (étoilé Michelin)
- Horaires: 
  * Déjeuner: 12h-14h30
  * Dîner: 19h-22h30
  * Fermé le lundi
- Capacité: 60 couverts + terrasse (20 places)
- Salle privée disponible pour événements (jusqu'à 20 personnes)

MENUS ET TARIFS:
1. Menu Déjeuner (28€): Entrée + Plat ou Plat + Dessert
2. Menu Découverte (55€): Entrée + Plat + Fromage + Dessert  
3. Menu Dégustation (85€): 7 plats signatures du Chef
4. Carte des vins: À partir de 35€ la bouteille

SPÉCIALITÉS DE LA MAISON:
- Foie gras maison aux épices douces
- Risotto crémeux aux truffes noires
- Entrecôte de bœuf Wagyu, sauce béarnaise
- Sole meunière, beurre aux câpres
- Tarte Tatin revisitée, glace vanille Bourbon

OPTIONS DIÉTÉTIQUES:
- Options végétariennes disponibles
- Menu sans gluten sur demande (prévenir 24h à l'avance)
- Allergies prises en compte (demander lors de la réservation)
- Menu enfant: 18€ (moins de 12 ans)

SERVICES:
- Voiturier gratuit le soir
- Wifi gratuit
- Climatisation
- Accès PMR
- Terrasse chauffée en hiver

PROCESSUS DE RÉSERVATION:
1. Demander la date et l'heure souhaitées
2. Demander le nombre de personnes
3. Vérifier la disponibilité (pour la démo, toujours disponible sauf si plus de 15 personnes)
4. Demander le nom pour la réservation
5. Demander un numéro de téléphone
6. Demander s'il y a des allergies ou régimes spéciaux
7. Demander si c'est une occasion spéciale (anniversaire, etc.)
8. Confirmer tous les détails
9. Remercier et donner le numéro de confirmation

GESTION DES GROUPES (plus de 8 personnes):
- Proposer la salle privée
- Mentionner le menu groupe (45€/personne, menu unique pour toute la table)
- Demande d'acompte de 30% pour les groupes de plus de 10 personnes

ANNULATIONS:
- Gratuite jusqu'à 24h avant
- 50% facturés si annulation moins de 24h avant
- 100% facturés en cas de no-show

RÉCLAMATIONS:
1. Écouter attentivement et montrer de l'empathie sincère
2. S'excuser au nom du restaurant
3. Proposer une compensation (café offert, réduction prochaine visite)
4. Proposer de transférer au directeur si le client insiste
5. Remercier pour le retour

STYLE DE COMMUNICATION:
- Vouvoiement systématique
- Ton chaleureux mais professionnel
- Phrases courtes et claires
- Confirmer les informations en les répétant
- Finir par demander si le client a d'autres questions

EXEMPLES DE FORMULES:
- Accueil: "Le Bistrot Parisien, bonjour ! Comment puis-je vous aider ?"
- Remerciement: "Je vous remercie pour votre réservation, nous avons hâte de vous accueillir."
- Au revoir: "Excellente journée à vous, à très bientôt au Bistrot Parisien !"`,

    // ============================================
    // METADATA
    // ============================================
    version: '2.0',
    enabled: true,
    lastUpdated: '2024-01-15'
};
