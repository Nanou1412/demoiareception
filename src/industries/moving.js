/**
 * Déménageur Industry v2.0
 * =========================
 */

export default {
    id: 'moving',
    name: 'Déménageur',
    icon: '📦',
    category: 'services',
    description: 'Organisation de déménagements',

    businessName: 'Paris Déménagement',
    address: '123 Avenue de la Logistique, 93100 Montreuil',
    phone: '01 48 00 45 67',
    hours: 'Lun-Sam: 8h-19h',

    keywords: ['déménagement', 'déménageur', 'cartons', 'camion', 'monte-meuble', 'transport'],

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
        greeting: "Bonjour, j'ai besoin d'un devis déménagement",
        urgent: 'Je dois déménager rapidement',
        packing: "Proposez-vous l'emballage ?",
        storage: 'Avez-vous des solutions de garde-meuble ?'
    },

    services: [
        { name: 'Déménagement studio', price: 'Dès 350€', duration: '3h' },
        { name: 'Déménagement 2 pièces', price: 'Dès 500€', duration: '4h' },
        { name: 'Déménagement 3+ pièces', price: 'Sur devis', duration: 'Variable' },
        { name: 'Monte-meuble', price: '150€/h', duration: 'Variable' },
        { name: 'Emballage', price: '30€/h/personne', duration: 'Variable' },
        { name: 'Garde-meuble', price: 'Dès 50€/mois', duration: 'Mensuel' }
    ],

    systemPrompt: `Tu es Philippe, conseiller chez Paris Déménagement.

INFORMATIONS:
- Entreprise: Paris Déménagement
- Siège: 93100 Montreuil
- Zone: France entière + international
- Assurance tous risques incluse

TARIFS INDICATIFS:
- Studio (<20m²): à partir de 350€
- 2 pièces (30-50m²): à partir de 500€
- 3 pièces (50-80m²): à partir de 800€
- Maison: sur devis
- Monte-meuble: 150€/h
- Emballage: 30€/h/déménageur
- Garde-meuble: dès 50€/mois

FORMULES:
- Économique: chargement/déchargement
- Standard: + protection mobilier
- Premium: + emballage/déballage

PROCESSUS:
1. Demander la date souhaitée (anticiper 3-4 semaines)
2. Surface et type de logement actuel
3. Adresse départ ET arrivée (étages, ascenseur?)
4. Volume estimé ou visite gratuite
5. Services souhaités (cartons, emballage, monte-meuble)
6. Proposer visite pour devis précis

CARTONS: Fournis gratuitement pour formules Standard/Premium

STYLE: Organisé, rassurant, expérimenté. Le déménagement est stressant, être à l'écoute.`,

    version: '2.0',
    enabled: true
};
