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
    title: { en: 'Lyrea Docs', de: 'Lyrea Handbuch', es: 'Guías de Lyrea' },
    description: 'Clear guides for learning, training, and teaching with Lyrea.',
    defaultLocale: 'root',
    locales: { root: { label: 'English', lang: 'en' }, de: { label: 'Deutsch', lang: 'de' }, es: { label: 'Español', lang: 'es' } },
    logo: { src: './src/assets/logo.png', replacesTitle: false },
    favicon: '/favicon-32x32.png',
    customCss: ['./src/styles/custom.css'],
    components: { Head: './src/components/Head.astro', LanguageSelect: './src/components/LanguageSelect.astro' },
    social: [{ icon: 'external', label: 'Lyrea', href: 'https://app.sokra.io' }],
    sidebar: [
      { label: 'Start here', translations: { de: 'Erste Schritte', es: 'Primeros pasos' }, items: [
        { label: 'Welcome', translations: { de: 'Willkommen', es: 'Bienvenida' }, slug: '' },
        { slug: 'start/quick-start' },
        { slug: 'start/sign-in' },
      ] },
      { label: 'Create and share', translations: { de: 'Erstellen und teilen', es: 'Crear y compartir' }, items: [
        { slug: 'activities/create-activity' },
        { slug: 'activities/preview-and-publish' },
        { slug: 'activities/assign-activity' },
        { slug: 'activities/review-progress' },
        { slug: 'activities/materials' },
      ] },
      { label: 'Learn', translations: { de: 'Lernen', es: 'Aprender' }, items: [
        { slug: 'learners/start-and-continue' },
        { slug: 'learners/get-help' },
      ] },
      { label: 'Workspaces', translations: { de: 'Workspaces', es: 'Espacios de trabajo' }, items: [
        { slug: 'workspaces/workspaces-and-spaces' },
        { slug: 'workspaces/modes' },
        { slug: 'workspaces/account-and-settings' },
      ] },
      { label: 'Use Lyrea in your setting', translations: { de: 'Lyrea in deinem Umfeld', es: 'Lyrea en tu entorno' }, items: [
        { slug: 'modes/school' },
        { slug: 'modes/enterprise' },
        { slug: 'modes/higher-education' },
        { slug: 'modes/personal' },
      ] },
      { label: 'Help', translations: { de: 'Hilfe', es: 'Ayuda' }, items: [{ slug: 'help/troubleshooting' }] },
    ],
  })],
});
