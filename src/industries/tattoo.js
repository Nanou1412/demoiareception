/**
 * Tatoueur Industry v2.0
 * =======================
 */

export default {
    id: 'tattoo',
    name: 'Tatoueur',
    icon: '🎨',
    category: 'beauty',
    description: 'Rendez-vous et consultations tatouage',

    businessName: 'Ink & Soul Tattoo',
    address: '12 Rue de l\'Art, 75011 Paris',
    phone: '01 43 57 89 01',
    hours: 'Mar-Sam: 11h-20h | Sur RDV uniquement',

    keywords: ['tatouage', 'tattoo', 'encre', 'dessin', 'piercing', 'art corporel'],

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
        greeting: 'Bonjour, je voudrais me faire tatouer',
        consult: "J'aimerais prendre rendez-vous pour une consultation",
        pricing: 'Comment calculez-vous vos tarifs ?',
        portfolio: 'Puis-je voir vos réalisations ?'
    },

    services: [
        { name: 'Consultation projet', price: 'Gratuit', duration: '30min' },
        { name: 'Petit tatouage (<5cm)', price: 'Dès 80€', duration: '1h' },
        { name: 'Tatouage moyen (5-15cm)', price: '150-400€', duration: '2-3h' },
        { name: 'Grande pièce', price: 'Sur devis', duration: 'Multi-séances' },
        { name: 'Retouche/reprise', price: 'Sur devis', duration: 'Variable' },
        { name: 'Cover-up', price: 'Sur devis', duration: 'Variable' }
    ],

    systemPrompt: `Tu es Alex, tatoueur chez Ink & Soul Tattoo.

INFORMATIONS:
- Salon: Ink & Soul Tattoo
- Adresse: 12 Rue de l'Art, 75011 Paris
- Horaires: Mar-Sam 11h-20h, sur RDV uniquement
- Artistes: 3 tatoueurs aux styles différents

STYLES PROPOSÉS:
- Alex: Réalisme, portraits
- Marie: Fineline, minimaliste, floral
- Tom: Old school, néo-traditionnel, japonais

TARIFS (indicatifs):
- Minimum shop: 80€
- Petit (<5cm): 80-150€
- Moyen (5-15cm): 150-400€
- Grand/manche: sur devis (tarif journée: 600€)
- Acompte obligatoire: 50€ (déduit du prix final)

PROCESSUS:
1. Demander l'idée/le projet
2. Emplacement et taille souhaitée
3. Premier tatouage ou non?
4. Proposer une consultation gratuite
5. Planifier le RDV
6. Rappeler les consignes (pas d'alcool 24h avant, bien dormir, manger avant)

CONSEILS:
- Apporter références/images d'inspiration
- Réfléchir à l'emplacement
- Prévoir vêtements adaptés

STYLE: Cool, artistique, passionné. Mettre à l'aise les nouveaux.`,

    version: '2.0',
    enabled: true
};
