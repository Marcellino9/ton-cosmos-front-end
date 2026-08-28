import {
    Briefcase,
    CalendarDays,
    Compass,
    Cpu,
    FileEdit,
    Heart,
    Mail,
    Shield,
    Sparkles,
    Sun,
} from 'lucide-react';

export const sept_dimensions = [
    {
        icon: Sun,
        title: 'Portrait Astral',
        description:
            'Ton signe solaire, lunaire et ascendant décryptés en profondeur. Les dominantes planétaires qui dessinent ta personnalité.',
        tags: ['Solaire', 'Lunaire', 'Ascendant'],
    },
    {
        icon: Heart,
        title: 'Amour & Relations',
        description:
            'Ce que Vénus et Mars révèlent de ta vie sentimentale. Les dynamiques relationnelles et tes patterns amoureux.',
        tags: ['Vénus', 'Mars', 'Maison VII'],
    },
    {
        icon: Compass,
        title: 'Mission de Vie',
        description:
            'Ton Nœud Nord, ta maison X, les talents à développer. Le chemin que les étoiles ont tracé pour ton évolution.',
        tags: ['Nœud Nord', 'Maison X', 'Vocation'],
    },
    {
        icon: Shield,
        title: 'Ombres & Défis',
        description:
            'Les leçons de Saturne, les zones de transformation. Les blocages à identifier et dépasser pour avancer sereinement.',
        tags: ['Saturne', 'Maison XII', 'Croissance'],
    },
    {
        icon: CalendarDays,
        title: 'Prédictions 12 Mois',
        description:
            'Mois par mois, les transits planétaires qui impacteront ta vie. Les périodes clés et les opportunités à saisir.',
        tags: ['Transits', 'Prévisions', 'Timing'],
    },
    {
        icon: Sparkles,
        title: 'Conseils Personnalisés',
        description:
            'Des recommandations concrètes basées sur ton thème astral pour prendre de meilleures décisions au quotidien.',
        tags: ['Conseils', 'Clarté', 'Actions'],
    },
    {
        icon: Briefcase,
        title: 'Carrière & Finances',
        description:
            'Les influences astrologiques sur ta vie professionnelle et tes opportunités financières.',
        tags: ['Carrière', 'Argent', 'Succès'],
    },
];

export const faqs = [
    {
        q: 'Combien de temps faut-il pour recevoir mon rapport ?',
        a: 'Ton rapport est généré en moins de deux minutes après le paiement. Tu le reçois directement par email en format PDF. Pense à vérifier tes spams si tu ne le trouves pas dans ta boîte de réception.',
    },
    {
        q: 'Le rapport est-il vraiment personnalisé ?',
        a: 'Absolument. Chaque rapport est généré sur mesure à partir de ta date, heure et lieu de naissance. Notre IA analyse tes placements planétaires réels pour produire un contenu unique. Deux personnes nées le même jour mais à des heures différentes obtiendront des rapports très distincts.',
    },
    {
        q: 'Je ne connais pas mon heure de naissance',
        a: "Ce n'est pas un problème. Coche simplement l'option correspondante dans le formulaire. Le rapport sera calculé avec midi comme heure par défaut. Tu recevras toutes les analyses sauf l'ascendant et les maisons, qui nécessitent l'heure exacte.",
    },
    {
        q: 'Quelle est la différence entre les deux formules ?',
        a: "La formule Essentiel inclut ton portrait astral, l'analyse amour et relations, ainsi que ta mission de vie. La formule Complet ajoute les sections Ombres et Défis et les prédictions détaillées mois par mois sur douze mois, plus la roue de ton thème natal.",
    },
    {
        q: 'Le calcul astral est-il fiable ?',
        a: "Nous utilisons les éphémérides Swiss Ephemeris, la référence mondiale en calcul astronomique. Cette bibliothèque est utilisée par les astrologues professionnels et les astronomes. Les positions planétaires sont calculées à la seconde d'arc près.",
    },
    {
        q: 'Puis-je offrir un rapport ?',
        a: "Bien sûr. Il suffit d'entrer les données de naissance de la personne concernée. C'est un cadeau original et personnel. Le rapport sera envoyé à l'adresse email que tu indiques.",
    },
    {
        q: 'Mes données sont-elles protégées ?',
        a: 'Oui, nous respectons strictement le RGPD. Tes données de naissance sont utilisées uniquement pour générer ton rapport, puis pseudonymisées. Nous ne revendons jamais tes données. Le paiement est sécurisé par Stripe.',
    },
];

export const steps = [
    {
        icon: FileEdit,
        title: 'Saisis tes données',
        description:
            'Date, heure et lieu de naissance. Les seules informations nécessaires pour calculer ton thème natal avec précision.',
        step: '01',
    },
    {
        icon: Cpu,
        title: 'Notre IA analyse',
        description:
            'Notre moteur calcule tes positions planétaires exactes, puis rédige un rapport unique de 40 à 60 pages.',
        step: '02',
    },
    {
        icon: Mail,
        title: 'Reçois ton rapport',
        description:
            'En moins de deux minutes, ton rapport PDF premium arrive dans ta boîte mail. Prêt à être consulté.',
        step: '03',
    },
];

const essentiel_features = [
    'Fondations : Soleil, Lune, Ascendant',
    'Alchimie de la Pensée (Mercure)',
    'Roue du Destin : Les 12 secteurs de vie',
    'Le Langage du Cœur (Amour & Désir)',
    'Vocation et réussite sociale',
    "Boussole de l'Âme (Chemin de vie)",
    'Rituels et conseils d’alignement',
    'Analyse immersive (env. 30 pages)',
];

const complet_features = [
    ...essentiel_features,
    'L’Espace de Guérison (Blessures & Ombres)',
    'Dialogue des Astres (Défis & Dons innés)',
    'Les Cycles à Venir (Prédictions sur 12 mois)',
    'Étude approfondie des Dominantes énergétiques',
    'Synthèse magistrale et message d’Indira',
    'Format Prestige (40 à 60 pages détaillées)',
    'Accès prioritaire par email (PDF)',
];

const annee_cosmique_features = [
    ...essentiel_features,
    'Révolution Solaire (Thème Anniversaire)',
    'Prévisions détaillées mois par mois',
    'Amour, Carrière, Énergie & Finances',
    'Format Cosmos (env. 40 pages)',
];

const cosmos_integral_features = [
    ...complet_features,
    'Révolution Solaire (Thème Anniversaire)',
    'Prévisions détaillées mois par mois',
    'La Boussole Karmique profonde',
    'Accompagnement Audio Guidé (TTS)',
    'Poster HD A3 Imprimable (Carte du Ciel)',
    'Format Ultime (Tout inclus, +70 pages)',
];

export const plans = {
    essentiel: {
        name: 'Essentiel',
        price: '9,90',
        priceNum: 9.9,
        features: essentiel_features,
        missing: [
            'Espace de Guérison (Chiron & Lune Noire)',
            'Géométrie des Astres (Aspects majeurs)',
            'Cycles de transformation (Prédictions 12 mois)',
        ],
    },
    complet: {
        name: 'Complet',
        price: '24,90',
        priceNum: 24.9,
        features: complet_features,
        missing: [],
    },
    annee_cosmique: {
        name: 'Année Cosmique',
        price: '34,90',
        priceNum: 34.9,
        features: annee_cosmique_features,
        missing: [
            'Espace de Guérison (Chiron & Lune Noire)',
            'Géométrie des Astres (Aspects majeurs)',
        ],
    },
    cosmos_integral: {
        name: 'Cosmos Intégral',
        price: '59,90',
        priceNum: 59.9,
        popular: true,
        badge: 'Tout inclus',
        features: cosmos_integral_features,
        missing: [],
    },
};

/**
 * URL du blog (sous-domaine séparé, déployé sur Vercel).
 * Centralisée ici : elle sert au header, au footer et au JSON-LD.
 */
export const BLOG_URL = 'https://blog.toncosmos.fr/';

export type NavLink = {
    label: string;
    href: string;
    /** Lien vers un autre domaine/sous-domaine (rendu avec target + rel). */
    external?: boolean;
};

/**
 * Navigation du header — source unique de vérité.
 *
 * `prefix` vaut '' sur la landing (ancres locales) et '/' sur les autres
 * pages publiques, pour que les ancres renvoient d'abord vers l'accueil.
 */
export const buildNavLinks = (prefix: '' | '/' = ''): NavLink[] => [
    { label: 'Accueil', href: `${prefix}#hero` },
    { label: 'Contenu', href: `${prefix}#contenu` },
    { label: 'Processus', href: `${prefix}#processus` },
    { label: 'Blog', href: BLOG_URL, external: true },
    { label: 'Commander', href: `${prefix}#commander` },
];

export const links = {};
