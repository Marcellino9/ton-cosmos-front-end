import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from 'vite-plugin-sitemap';

// Pages publiques indexables par les moteurs de recherche.
// - '/' n'est pas listée : le plugin la déduit déjà de dist/index.html
//   (la lister ici créait une entrée en double dans le sitemap).
// - /payments et /payments-success ne sont plus listées : elles dépendent d'un
//   sessionStorage rempli par le tunnel de commande, donc vides pour un crawler
//   (Google les remonte en « Soft 404 »). Elles restent accessibles, juste
//   pas proposées à l'indexation.
// - Les routes /administrator/* sont interdites via public/robots.txt.
const publicRoutes = ['/choose-plans'];

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        host: '::',
    },
    plugins: [
        react(),
        tailwindcss(),
        // Ce plugin fait autorité pour dist/sitemap.xml (il écrit après la copie
        // de public/, donc il écraserait tout sitemap.xml placé là).
        // robots.txt est au contraire maintenu à la main dans public/robots.txt —
        // il y déclare aussi le sitemap du blog, ce que ce plugin ne sait pas
        // exprimer sans reprendre la génération complète du fichier.
        sitemap({
            hostname: 'https://toncosmos.fr',
            dynamicRoutes: publicRoutes,
            generateRobotsTxt: false,
            outDir: 'dist',
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date(),
            readable: true,
        }),
    ],
    resolve: {
        tsconfigPaths: true,
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
