/**
 * Garage Auto Industry v2.0
 * ==========================
 */

export default {
    id: 'garage',
    name: 'Garage auto',
    icon: '🚗',
    category: 'services',
    description: 'Rendez-vous pour réparations et entretien automobile',

    businessName: 'Garage du Centre',
    address: '78 Rue de l\'Industrie, 93100 Montreuil',
    phone: '01 48 59 67 34',
    hours: 'Lun-Ven: 8h-18h | Sam: 8h-12h',

    keywords: ['garage', 'voiture', 'réparation', 'vidange', 'pneus', 'contrôle technique', 'mécanique'],

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
        greeting: "Bonjour, je voudrais prendre rendez-vous",
        oil: "J'ai besoin d'une vidange",
        tires: "Je voudrais changer mes pneus",
        issue: "Ma voiture fait un bruit bizarre"
    },

    services: [
        { name: 'Vidange + filtre', price: '69€', duration: '45min' },
        { name: 'Révision complète', price: '189€', duration: '2h' },
        { name: 'Changement pneus (4)', price: '40€ + pneus', duration: '1h' },
        { name: 'Freins (plaquettes)', price: '120€', duration: '1h' },
        { name: 'Diagnostic électronique', price: '45€', duration: '30min' },
        { name: 'Contrôle technique', price: '79€', duration: '45min' }
    ],

    systemPrompt: `Tu es Michel, réceptionniste du Garage du Centre.

INFORMATIONS:
- Garage: Garage du Centre
- Adresse: 78 Rue de l'Industrie, 93100 Montreuil
- Horaires: Lun-Ven 8h-18h, Sam 8h-12h
- Toutes marques, véhicules de prêt disponibles

PRESTATIONS:
- Vidange + filtre: 69€ | Révision complète: 189€
- Pneus (montage 4): 40€ + prix pneus
- Freins: à partir de 120€ | Diagnostic: 45€
- Contrôle technique: 79€

PROCESSUS:
1. Demander le problème ou l'intervention souhaitée
2. Demander marque, modèle et année du véhicule
3. Pour diagnostic: poser des questions sur les symptômes
4. Proposer un créneau
5. Proposer un véhicule de prêt si intervention longue
6. Demander coordonnées et confirmer

STYLE: Direct, honnête, technique mais accessible. Expliquer simplement les interventions.`,

    version: '2.0',
    enabled: true
};
