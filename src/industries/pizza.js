/**
 * Pizzeria Industry v2.0
 * =======================
 */

export default {
    id: 'pizza',
    name: 'Pizzeria',
    icon: '🍕',
    category: 'restaurant',
    description: 'Commandes et livraisons de pizzas',

    businessName: 'Pizza Napoli',
    address: '32 Rue de Naples, 75008 Paris',
    phone: '01 45 22 67 89',
    hours: 'Mar-Dim: 11h30-14h30, 18h30-22h30 | Fermé lundi',

    keywords: ['pizza', 'pizzeria', 'livraison', 'italien', 'à emporter', 'commande'],

    capabilities: {
        appointments: false,
        pricing: true,
        hours: true,
        complaints: true,
        emergencies: false,
        orders: true,
        productInfo: true
    },

    quickMessages: {
        greeting: "Bonjour, je voudrais commander des pizzas",
        menu: "Quelles pizzas avez-vous ?",
        delivery: "Faites-vous la livraison ?",
        time: "Quel est le délai de livraison ?"
    },

    menu: [
        { name: 'Margherita', price: '11€', ingredients: 'Tomate, mozzarella, basilic' },
        { name: 'Regina', price: '13€', ingredients: 'Tomate, mozzarella, jambon, champignons' },
        { name: '4 Fromages', price: '14€', ingredients: 'Mozzarella, gorgonzola, chèvre, parmesan' },
        { name: 'Calzone', price: '14€', ingredients: 'Tomate, mozzarella, jambon, œuf' },
        { name: 'Végétarienne', price: '13€', ingredients: 'Légumes grillés, mozzarella' },
        { name: 'Napolitaine', price: '12€', ingredients: 'Tomate, anchois, câpres, olives' }
    ],

    systemPrompt: `Tu es Marco, au téléphone de Pizza Napoli, une authentique pizzeria napolitaine.

INFORMATIONS:
- Pizzeria: Pizza Napoli
- Adresse: 32 Rue de Naples, 75008 Paris
- Horaires: Mar-Dim 11h30-14h30, 18h30-22h30
- Livraison gratuite à partir de 20€ (rayon 3km)
- Délai moyen: 30-45 min

CARTE (prix taille normale, +3€ pour grande):
- Margherita: 11€ | Regina: 13€
- 4 Fromages: 14€ | Calzone: 14€
- Végétarienne: 13€ | Napolitaine: 12€
- Desserts: Tiramisu 6€, Panna Cotta 5€

PROCESSUS COMMANDE:
1. Demander si sur place, à emporter ou livraison
2. Prendre la commande (pizzas, taille, boissons, desserts)
3. Pour livraison: demander adresse complète
4. Donner le total et le délai estimé
5. Demander nom et téléphone
6. Confirmer la commande

STYLE: Chaleureux, accent italien sympathique, utiliser "Buongiorno", "Perfetto", "Grazie".`,

    version: '2.0',
    enabled: true
};
