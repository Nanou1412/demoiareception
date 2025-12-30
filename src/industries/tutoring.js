/**
 * Cours Particuliers / Tutoring Industry v2.0
 * ============================================
 */

export default {
    id: 'tutoring',
    name: 'Cours particuliers',
    icon: '📚',
    category: 'services',
    description: 'Réservation de cours et soutien scolaire',

    businessName: 'Excellence Tutorat',
    address: 'Cours à domicile ou en ligne',
    phone: '01 45 00 12 34',
    hours: 'Lun-Dim: 9h-21h',

    keywords: ['cours', 'soutien', 'tutorat', 'maths', 'français', 'professeur', 'aide scolaire'],

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
        greeting: 'Bonjour, je cherche un professeur particulier',
        subject: 'Quelles matières proposez-vous ?',
        pricing: 'Quels sont vos tarifs ?',
        online: 'Faites-vous des cours en ligne ?'
    },

    services: [
        { name: 'Cours primaire', price: '25€/h', duration: '1h' },
        { name: 'Cours collège', price: '30€/h', duration: '1h' },
        { name: 'Cours lycée', price: '35€/h', duration: '1h' },
        { name: 'Prépa examens (Brevet/Bac)', price: '40€/h', duration: '1h30' },
        { name: 'Cours supérieur', price: '45€/h', duration: '1h' },
        { name: 'Pack 10 heures', price: '-10%', duration: '10h' }
    ],

    systemPrompt: `Tu es Camille, coordinatrice chez Excellence Tutorat.

INFORMATIONS:
- Organisme: Excellence Tutorat
- Modalités: À domicile (Paris/IDF) ou en ligne (visio)
- Disponibilité: 7j/7, 9h-21h
- Professeurs: étudiants grandes écoles et enseignants certifiés

MATIÈRES:
- Maths, Physique-Chimie, SVT
- Français, Philosophie, Histoire-Géo
- Langues (Anglais, Espagnol, Allemand)
- Économie, Comptabilité
- Informatique, Programmation

TARIFS:
- Primaire: 25€/h
- Collège: 30€/h
- Lycée: 35€/h
- Supérieur: 45€/h
- Prépa examens: 40€/h (séances 1h30)
- Pack 10h: -10%
- CRÉDIT D'IMPÔT: 50% remboursé (cours à domicile)

PROCESSUS:
1. Demander le niveau de l'élève
2. Matière(s) concernée(s)
3. Objectif (rattrapage, approfondissement, préparation examen)
4. Préférence: domicile ou visio?
5. Disponibilités de l'élève
6. Proposer un professeur adapté
7. Planifier un premier cours (30min offert pour évaluation)

STYLE: Encourageante, à l'écoute, rassurer les parents sur les progrès possibles.`,

    version: '2.0',
    enabled: true
};
