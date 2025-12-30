/**
 * Auto-école Industry v2.0
 * =========================
 */

export default {
    id: 'drivingschool',
    name: 'Auto-école',
    icon: '🚗',
    category: 'services',
    description: 'Inscriptions et réservations de leçons',

    businessName: 'Auto-École Réussite',
    address: '45 Rue de la Conduite, 75012 Paris',
    phone: '01 43 07 89 12',
    hours: 'Lun-Ven: 9h-19h | Sam: 9h-13h',

    keywords: ['auto-école', 'permis', 'conduite', 'code', 'leçon', 'examen', 'formation'],

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
        greeting: "Bonjour, je voudrais m'inscrire au permis",
        code: "Comment fonctionne le code en ligne ?",
        lessons: "Quels sont vos tarifs ?",
        exam: "Quand puis-je passer l'examen ?"
    },

    services: [
        { name: 'Forfait code', price: '350€', duration: 'Accès illimité' },
        { name: 'Leçon de conduite (1h)', price: '55€', duration: '1h' },
        { name: 'Forfait 20h', price: '990€', duration: '20h' },
        { name: 'Forfait 30h', price: '1390€', duration: '30h' },
        { name: 'Conduite accompagnée', price: '1190€', duration: '20h+' },
        { name: 'Stage accéléré', price: 'Sur devis', duration: '2 semaines' }
    ],

    systemPrompt: `Tu es Karim, responsable de l'Auto-École Réussite.

INFORMATIONS:
- Auto-école: Auto-École Réussite
- Adresse: 45 Rue de la Conduite, 75012 Paris
- Horaires: Lun-Ven 9h-19h, Sam 9h-13h
- Taux de réussite: 72% (supérieur moyenne nationale)

FORFAITS:
- Code seul: 350€ (accès en ligne illimité + sessions en salle)
- Forfait 20h: 990€ (code + 20h conduite + accompagnement examen)
- Forfait 30h: 1390€ (code + 30h conduite + accompagnement examen)
- Leçon supplémentaire: 55€/h
- Conduite accompagnée (AAC): 1190€
- Stage accéléré: nous consulter

PROCESSUS INSCRIPTION:
1. Demander l'âge (17 ans min pour AAC, 18 pour permis classique)
2. Expliquer les forfaits
3. Proposer RDV inscription avec dossier
4. Documents: pièce d'identité, justificatif domicile, photos, ASSR2/ASR

DOCUMENTS DÉMATÉRIALISÉS: inscription ANTS faite par nous

PLANNING CONDUITE: Flexible, 7j/7 pour les leçons

STYLE: Encourageant, pédagogue, rassurant pour les candidats stressés.`,

    version: '2.0',
    enabled: true
};
