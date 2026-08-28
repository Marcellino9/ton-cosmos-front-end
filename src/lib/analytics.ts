import type { createBrowserRouter } from 'react-router-dom';

type Router = ReturnType<typeof createBrowserRouter>;

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

/**
 * ID de mesure GA4 — codé en dur volontairement.
 *
 * Le site est hébergé sur un serveur auquel nous n'avons pas accès : impossible
 * d'y définir une variable d'environnement au moment du build. La valeur est donc
 * inscrite ici. Ce n'est pas un secret : un ID de mesure GA4 est de toute façon
 * visible dans le HTML de n'importe quel site qui l'utilise.
 *
 * C'est le même ID que blog.toncosmos.fr, et c'est délibéré : les deux
 * sous-domaines partagent ainsi une seule propriété GA4, donc le parcours
 * blog → site → paiement reste dans une même session.
 *
 * VITE_GA_MEASUREMENT_ID reste accepté et prend le dessus si la variable est un
 * jour définie au build (pratique pour envoyer les tests vers une autre propriété).
 */
const MEASUREMENT_ID =
    (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || 'G-F2CW80W38Z';

/** Sur ce site, tout ce qui est sous /administrator est privé : on ne le mesure pas. */
const isPrivatePath = (pathname: string) => pathname.startsWith('/administrator');

/**
 * L'ID étant désormais toujours défini, il faut exclure explicitement le
 * développement local — sinon `npm run dev` et `vite preview` enverraient du
 * trafic localhost dans les statistiques de production.
 */
const LOCAL_HOSTNAMES = ['localhost', '127.0.0.1', '[::1]', ''];

const isLocalHost = () => LOCAL_HOSTNAMES.includes(window.location.hostname);

const currentPath = () => `${window.location.pathname}${window.location.search}`;

const sendPageView = () => {
    if (!window.gtag || isPrivatePath(window.location.pathname)) return;

    window.gtag('event', 'page_view', {
        page_path: currentPath(),
        page_location: window.location.href,
        page_title: document.title,
    });
};

/**
 * Charge gtag.js et suit les navigations du routeur.
 *
 * L'appli est une SPA : gtag n'émettrait qu'un seul page_view au chargement.
 * On désactive donc l'envoi automatique (`send_page_view: false`) et on émet
 * nous-mêmes un page_view à chaque navigation React Router.
 *
 * Ne fait rien sur un hôte local, pour ne pas polluer les statistiques.
 */
export function initAnalytics(router: Router) {
    if (!MEASUREMENT_ID || isLocalHost() || document.getElementById('ga-gtag')) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
    };

    const script = document.createElement('script');
    script.id = 'ga-gtag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    // Pas de `linker` ici : blog.toncosmos.fr et toncosmos.fr partagent le même
    // domaine enregistrable, et gtag écrit son cookie sur toncosmos.fr par défaut
    // (cookie_domain: 'auto'). La session est donc déjà continue entre les deux si
    // le même ID de mesure est utilisé de part et d'autre.
    window.gtag('config', MEASUREMENT_ID, { send_page_view: false });

    sendPageView();

    let lastPath = currentPath();
    router.subscribe((state) => {
        if (state.navigation.state !== 'idle') return;

        const path = currentPath();
        if (path === lastPath) return;

        lastPath = path;
        sendPageView();
    });
}
