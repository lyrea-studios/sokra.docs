import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// The Pages workflow supplies its real URL. No custom domain is assumed.
const siteUrl = new URL(process.env.DOCS_SITE_URL || 'https://lyrea-studios.github.io/sokra.docs/');

export default defineConfig({
  site: siteUrl.origin,
  base: siteUrl.pathname,
  trailingSlash: 'always',
  redirects: Object.fromEntries(Object.entries({
    '/teachers/create-activity/': '/activities/create-activity/',
    '/teachers/preview-and-publish/': '/activities/preview-and-publish/',
    '/teachers/assign-activity/': '/activities/assign-activity/',
    '/teachers/review-progress/': '/activities/review-progress/',
    '/teachers/materials/': '/activities/materials/',
    '/schools/workspaces-and-spaces/': '/workspaces/workspaces-and-spaces/',
  }).map(([from, to]) => [from, siteUrl.pathname.replace(/\/$/, '') + to])),
  integrations: [starlight({
    title: { en: 'Klarisma Docs', de: 'Klarisma Handbuch', es: 'Guías de Klarisma' },
    description: 'Clear guides for learning, training, and teaching with Klarisma.',
    defaultLocale: 'root',
    locales: { root: { label: 'English', lang: 'en' }, de: { label: 'Deutsch', lang: 'de' }, es: { label: 'Español', lang: 'es' } },
    logo: { src: './src/assets/logo.png', replacesTitle: false },
    favicon: '/favicon-32x32.png',
    customCss: ['./src/styles/custom.css'],
    components: { Head: './src/components/Head.astro', LanguageSelect: './src/components/LanguageSelect.astro' },
    social: [{ icon: 'external', label: 'Klarisma', href: 'https://app.klarisma.de' }],
    sidebar: [
      { label: 'Start here', translations: { de: 'Erste Schritte', es: 'Primeros pasos' }, items: [
        { label: 'Welcome', translations: { de: 'Willkommen', es: 'Bienvenida' }, slug: '' },
        { slug: 'start/quick-start' },
        { slug: 'start/sign-in' },
      ] },
      { label: 'Create and share', translations: { de: 'Erstellen und teilen', es: 'Crear y compartir' }, items: [
        { slug: 'activities/create-activity' },
        { slug: 'activities/preview-and-publish' },
        { slug: 'activities/feedback-and-completion' },
        { slug: 'activities/assign-activity' },
        { slug: 'activities/review-progress' },
        { slug: 'activities/confirm-results' },
        { slug: 'activities/materials' },
      ] },
      { label: 'Learn', translations: { de: 'Lernen', es: 'Aprender' }, items: [
        { slug: 'learners/start-and-continue' },
        { slug: 'learners/get-help' },
        { slug: 'learners/my-learning' },
      ] },
      { label: 'Workspaces', translations: { de: 'Workspaces', es: 'Espacios de trabajo' }, items: [
        { slug: 'workspaces/workspaces-and-spaces' },
        { slug: 'workspaces/modes' },
        { slug: 'workspaces/roles-and-access' },
        { slug: 'workspaces/people' },
        { slug: 'workspaces/account-and-settings' },
      ] },
      { label: 'Use Klarisma in your setting', translations: { de: 'Klarisma in deinem Umfeld', es: 'Klarisma en tu entorno' }, items: [
        { slug: 'modes/school' },
        { slug: 'modes/enterprise' },
        { slug: 'modes/higher-education' },
        { slug: 'modes/personal' },
      ] },
      { label: 'Help', translations: { de: 'Hilfe', es: 'Ayuda' }, items: [{ slug: 'help/troubleshooting' }] },
    ],
  })],
});
