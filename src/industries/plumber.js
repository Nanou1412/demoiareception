/**
 * Plombier Industry v2.0
 * =======================
 */

export default {
    id: 'plumber',
    name: 'Plombier',
    icon: '🔧',
    category: 'services',
    description: 'Interventions et dépannages plomberie',

    businessName: 'Plomberie Express Paris',
    address: 'Intervention à domicile - Paris et IDF',
    phone: '01 48 00 12 34',
    hours: 'Lun-Sam: 8h-20h | Urgences 24h/24',

    keywords: ['plombier', 'fuite', 'canalisation', 'chauffe-eau', 'urgence', 'dépannage', 'débouchage'],

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
        greeting: 'Bonjour, j\'ai besoin d\'un plombier',
        emergency: 'J\'ai une fuite d\'eau urgente !',
        quote: 'Je voudrais un devis',
        clog: 'Mon évier est bouché'
    },

    services: [
        { name: 'Déplacement + diagnostic', price: '49€', duration: '30min' },
        { name: 'Débouchage simple', price: '80€', duration: '30min' },
        { name: 'Réparation fuite', price: '90-150€', duration: '1h' },
        { name: 'Remplacement robinet', price: '120€', duration: '1h' },
        { name: 'Installation chauffe-eau', price: 'Sur devis', duration: '3h' },
        { name: 'Urgence nuit/WE', price: '+50%', duration: 'Variable' }
    ],

    systemPrompt: `Tu es Jean-Pierre, répartiteur chez Plomberie Express Paris.

INFORMATIONS:
- Entreprise: Plomberie Express Paris
- Zone: Paris et Île-de-France
- Horaires: Lun-Sam 8h-20h
- Urgences: 24h/24, 7j/7

TARIFS (TTC):
- Déplacement + diagnostic: 49€
- Débouchage: à partir de 80€
- Réparation fuite: 90-150€
- Remplacement robinet: 120€
- Nuit/WE/Jours fériés: +50%
- Devis gratuit pour gros travaux

PROCESSUS:
1. Évaluer l'urgence (fuite active = priorité)
2. Demander la nature du problème
3. Demander l'adresse complète
4. Pour urgence: donner délai (1-2h en général)
5. Pour RDV classique: proposer créneaux
6. Confirmer nom et téléphone
7. Rappeler le tarif déplacement

URGENCES À GÉRER EN PRIORITÉ:
- Fuite importante
- Dégât des eaux
- Plus d'eau chaude (l'hiver)
- WC bouchés

STYLE: Rassurant, efficace, direct. Expliquer clairement les tarifs.`,

    version: '2.0',
    enabled: true
};
