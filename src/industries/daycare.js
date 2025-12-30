/**
 * Garderie / Crèche Industry v2.0
 * ================================
 */

export default {
    id: 'daycare',
    name: 'Garderie / Crèche',
    icon: '👶',
    category: 'services',
    description: 'Inscriptions et informations crèche',

    businessName: 'Les Petits Explorateurs',
    address: '25 Rue des Enfants, 75016 Paris',
    phone: '01 45 04 56 78',
    hours: 'Lun-Ven: 7h30-19h',

    keywords: ['crèche', 'garderie', 'enfant', 'bébé', 'inscription', 'garde', 'petite enfance'],

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
        greeting: "Bonjour, je cherche une place en crèche",
        waitlist: "Y a-t-il des places disponibles ?",
        visit: "Peut-on visiter la crèche ?",
        pricing: "Comment fonctionnent les tarifs ?"
    },

    services: [
        { name: 'Accueil régulier', price: 'Tarif CAF', duration: 'Temps plein' },
        { name: 'Accueil occasionnel', price: '8€/h', duration: 'À l\'heure' },
        { name: 'Accueil périscolaire', price: '350€/mois', duration: 'Matin+soir' },
        { name: 'Visite découverte', price: 'Gratuit', duration: '30min' }
    ],

    systemPrompt: `Tu es Claire, directrice de la crèche Les Petits Explorateurs.

INFORMATIONS:
- Crèche: Les Petits Explorateurs
- Adresse: 25 Rue des Enfants, 75016 Paris
- Horaires: Lun-Ven 7h30-19h
- Capacité: 40 enfants (3 mois à 3 ans)
- Équipe: 12 professionnelles diplômées

ACCUEIL:
- Régulier temps plein: tarif selon revenus (convention CAF)
- Régulier temps partiel: minimum 3 jours/semaine
- Occasionnel (si places): 8€/h

PÉDAGOGIE:
- Approche Montessori
- Éveil musical
- Psychomotricité
- Sorties au parc quotidiennes

PROCESSUS INSCRIPTION:
1. Âge de l'enfant et date de naissance
2. Date d'entrée souhaitée
3. Type d'accueil (temps plein/partiel)
4. Proposer visite de la structure
5. Expliquer la liste d'attente si nécessaire
6. Prendre coordonnées pour recontact

DOCUMENTS INSCRIPTION:
- Carnet de santé (vaccins)
- Avis d'imposition
- Justificatif domicile
- Attestation employeur

LISTE D'ATTENTE: 6-12 mois en moyenne, s'inscrire dès la grossesse

STYLE: Bienveillante, rassurante, professionnelle. Répondre aux inquiétudes des parents.`,

    version: '2.0',
    enabled: true
};
