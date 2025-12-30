/**
 * Industry Template v2.0
 * ======================
 * 
 * Template de base pour créer une nouvelle industrie
 * 
 * INSTRUCTIONS:
 * 1. Copier ce fichier avec le nom de l'industrie (ex: restaurant.js)
 * 2. Modifier les valeurs selon l'industrie
 * 3. Compléter le systemPrompt avec les détails spécifiques
 */

/**
 * Configuration de l'industrie
 * @type {IndustryConfig}
 */
export default {
    // ============================================
    // IDENTIFICATION (Obligatoire)
    // ============================================
    
    /**
     * ID unique de l'industrie (lowercase, sans espaces)
     * @type {string}
     */
    id: 'template',
    
    /**
     * Nom affiché de l'industrie
     * @type {string}
     */
    name: 'Template Industry',
    
    /**
     * Icône emoji de l'industrie
     * @type {string}
     */
    icon: '🏢',
    
    /**
     * Catégorie pour le filtrage
     * Options: restaurant, health, beauty, services, commerce, education, events, animals
     * @type {string}
     */
    category: 'services',
    
    /**
     * Description courte (max 100 caractères)
     * @type {string}
     */
    description: 'Description courte de l\'industrie pour la carte',

    // ============================================
    // INFORMATIONS BUSINESS (Optionnel)
    // ============================================
    
    /**
     * Nom de l'entreprise de démo
     * @type {string}
     */
    businessName: 'Demo Business',
    
    /**
     * Adresse de l'établissement
     * @type {string}
     */
    address: '123 Rue de la Demo, 75001 Paris',
    
    /**
     * Numéro de téléphone
     * @type {string}
     */
    phone: '01 23 45 67 89',
    
    /**
     * Horaires d'ouverture
     * @type {string}
     */
    hours: 'Lun-Ven: 9h-18h, Sam: 10h-17h',
    
    /**
     * Site web
     * @type {string}
     */
    website: 'www.demo-business.fr',

    // ============================================
    // MOTS-CLÉS POUR RECHERCHE
    // ============================================
    
    /**
     * Mots-clés pour améliorer la recherche
     * @type {string[]}
     */
    keywords: [
        'mot-clé 1',
        'mot-clé 2',
        'mot-clé 3'
    ],

    // ============================================
    // CAPACITÉS DE L'IA
    // ============================================
    
    /**
     * Fonctionnalités supportées par cette industrie
     * @type {Object}
     */
    capabilities: {
        /** Peut prendre des rendez-vous */
        appointments: true,
        
        /** Peut donner des informations sur les prix */
        pricing: true,
        
        /** Peut donner les horaires */
        hours: true,
        
        /** Peut traiter les réclamations */
        complaints: true,
        
        /** Peut traiter les urgences */
        emergencies: false,
        
        /** Peut prendre des commandes */
        orders: false,
        
        /** Peut donner des informations sur les produits/services */
        productInfo: true
    },

    // ============================================
    // MESSAGES RAPIDES
    // ============================================
    
    /**
     * Messages rapides personnalisés pour cette industrie
     * @type {Object<string, string>}
     */
    quickMessages: {
        greeting: "Bonjour, je souhaite prendre rendez-vous",
        availability: "Quelles sont vos disponibilités ?",
        pricing: "Quels sont vos tarifs ?",
        hours: "Quels sont vos horaires ?",
        info: "J'aurais besoin d'informations"
    },

    // ============================================
    // SCÉNARIOS DE CONVERSATION
    // ============================================
    
    /**
     * Scénarios de démo disponibles
     * @type {Object}
     */
    scenarios: {
        reservation: {
            enabled: true,
            label: 'Réservation',
            icon: '📅',
            initialMessage: null // L'IA commence
        },
        information: {
            enabled: true,
            label: 'Information',
            icon: 'ℹ️',
            initialMessage: null
        },
        complaint: {
            enabled: true,
            label: 'Réclamation',
            icon: '😤',
            initialMessage: null
        },
        emergency: {
            enabled: false,
            label: 'Urgence',
            icon: '🚨',
            initialMessage: null
        }
    },

    // ============================================
    // TARIFS (Optionnel)
    // ============================================
    
    /**
     * Grille tarifaire
     * @type {Array<{name: string, price: string, description?: string}>}
     */
    pricing: [
        { name: 'Service de base', price: '30€', description: 'Description du service' },
        { name: 'Service premium', price: '50€', description: 'Description du service premium' }
    ],

    // ============================================
    // SERVICES (Optionnel)
    // ============================================
    
    /**
     * Liste des services proposés
     * @type {string[]}
     */
    services: [
        'Service 1',
        'Service 2',
        'Service 3'
    ],

    // ============================================
    // PROMPT SYSTÈME (Obligatoire)
    // ============================================
    
    /**
     * Prompt système pour l'IA
     * Doit être détaillé et personnalisé pour l'industrie
     * @type {string}
     */
    systemPrompt: `Tu es l'assistant virtuel intelligent de Demo Business.

RÔLE:
Tu es un réceptionniste professionnel et chaleureux. Tu réponds aux appels téléphoniques 
de manière naturelle et tu aides les clients avec leurs demandes.

INFORMATIONS SUR L'ÉTABLISSEMENT:
- Nom: Demo Business
- Adresse: 123 Rue de la Demo, 75001 Paris
- Téléphone: 01 23 45 67 89
- Horaires: Lun-Ven: 9h-18h, Sam: 10h-17h

SERVICES PROPOSÉS:
- Service de base (30€)
- Service premium (50€)

CONSIGNES DE COMPORTEMENT:
1. Sois toujours poli, professionnel et chaleureux
2. Réponds de manière concise mais complète
3. Si tu ne sais pas, propose de prendre un message ou de rappeler
4. Confirme toujours les informations importantes (date, heure, nom)
5. Utilise le vouvoiement

PROCESSUS DE RÉSERVATION:
1. Demander le type de service souhaité
2. Proposer des créneaux disponibles
3. Demander le nom du client
4. Demander un numéro de téléphone de confirmation
5. Résumer et confirmer la réservation

GESTION DES RÉCLAMATIONS:
1. Écouter attentivement et montrer de l'empathie
2. S'excuser pour le désagrément
3. Proposer une solution ou transférer au responsable
4. Remercier le client de son retour

INFORMATIONS SUPPLÉMENTAIRES:
- [Ajouter des informations spécifiques à l'industrie]
- [Ajouter des FAQ courantes]
- [Ajouter des règles métier spécifiques]`,

    // ============================================
    // METADATA
    // ============================================
    
    /**
     * Version du template
     * @type {string}
     */
    version: '2.0',
    
    /**
     * Industrie active ou non
     * @type {boolean}
     */
    enabled: true,
    
    /**
     * Date de dernière mise à jour
     * @type {string}
     */
    lastUpdated: '2024-01-01'
};

/**
 * Type definition for IndustryConfig
 * @typedef {Object} IndustryConfig
 * @property {string} id - Unique identifier
 * @property {string} name - Display name
 * @property {string} icon - Emoji icon
 * @property {string} category - Category for filtering
 * @property {string} description - Short description
 * @property {string} [businessName] - Demo business name
 * @property {string} [address] - Business address
 * @property {string} [phone] - Phone number
 * @property {string} [hours] - Opening hours
 * @property {string[]} [keywords] - Search keywords
 * @property {Object} [capabilities] - AI capabilities
 * @property {Object} [quickMessages] - Quick message templates
 * @property {Object} [scenarios] - Available demo scenarios
 * @property {Array} [pricing] - Pricing information
 * @property {string[]} [services] - List of services
 * @property {string} systemPrompt - AI system prompt
 * @property {string} version - Template version
 * @property {boolean} enabled - Is industry active
 */
