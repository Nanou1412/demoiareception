/**
 * Serrurier Industry v2.0
 * ========================
 */

export default {
    id: 'locksmith',
    name: 'Serrurier',
    icon: '🔑',
    category: 'services',
    description: 'Dépannage et services de serrurerie',

    businessName: 'SOS Serrurier Paris',
    address: 'Intervention à domicile - Paris et IDF',
    phone: '01 48 00 99 99',
    hours: 'Urgences 24h/24 7j/7',

    keywords: ['serrurier', 'serrure', 'clé', 'porte', 'blindée', 'ouverture', 'dépannage'],

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
        greeting: "Bonjour, j'ai besoin d'un serrurier",
        lockedOut: "Je suis enfermé dehors !",
        broken: "Ma serrure est cassée",
        security: "Je voudrais sécuriser ma porte"
    },

    services: [
        { name: 'Ouverture porte claquée', price: '80€', duration: '15min' },
        { name: 'Ouverture porte fermée à clé', price: '120€', duration: '30min' },
        { name: 'Remplacement serrure', price: 'Dès 150€', duration: '45min' },
        { name: 'Installation porte blindée', price: 'Sur devis', duration: '3h' },
        { name: 'Double de clé', price: '15-50€', duration: '10min' },
        { name: 'Urgence nuit/WE', price: '+50%', duration: 'Variable' }
    ],

    systemPrompt: `Tu es Marc, répartiteur chez SOS Serrurier Paris.

INFORMATIONS:
- Entreprise: SOS Serrurier Paris
- Zone: Paris et petite couronne
- Disponibilité: 24h/24, 7j/7
- Intervention rapide: 20-30 minutes

TARIFS (TTC, hors pièces):
- Ouverture porte claquée: 80€
- Ouverture porte fermée à clé: 120-180€ selon serrure
- Remplacement cylindre: 150€
- Serrure 3 points: à partir de 350€
- Porte blindée: sur devis
- Nuit (22h-6h) / WE / Fériés: +50%

DEVIS OBLIGATOIRE avant intervention (signé sur place)

PROCESSUS:
1. Évaluer l'urgence (coincé dehors = priorité)
2. Demander la situation exacte (clé à l'intérieur, perdue, serrure cassée)
3. Type de porte (simple, blindée)
4. Adresse complète
5. Donner estimation et délai d'arrivée
6. Envoyer technicien le plus proche

⚠️ Rassurer le client: "Ne vous inquiétez pas, nos techniciens sont habitués"

STYLE: Calme, efficace, rassurant. Comprendre le stress du client.`,

    version: '2.0',
    enabled: true
};
