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
    title: 'Sokra Docs',
    description: 'Clear guides for learning, training, and teaching with Sokra.',
    defaultLocale: 'root',
    locales: { root: { label: 'English', lang: 'en' } },
    logo: { src: './src/assets/logo.png', replacesTitle: false },
    favicon: '/favicon-32x32.png',
    customCss: ['./src/styles/custom.css'],
    social: [{ icon: 'external', label: 'Open Sokra', href: 'https://app.sokra.io' }],
    sidebar: [
      { label: 'Start here', items: [
        { label: 'Welcome', slug: '' },
        { slug: 'start/quick-start' },
        { slug: 'start/sign-in' },
      ] },
      { label: 'Create and share', items: [
        { slug: 'activities/create-activity' },
        { slug: 'activities/preview-and-publish' },
        { slug: 'activities/assign-activity' },
        { slug: 'activities/review-progress' },
        { slug: 'activities/materials' },
      ] },
      { label: 'Learn', items: [
        { slug: 'learners/start-and-continue' },
        { slug: 'learners/get-help' },
      ] },
      { label: 'Workspaces', items: [
        { slug: 'workspaces/workspaces-and-spaces' },
        { slug: 'workspaces/modes' },
        { slug: 'workspaces/account-and-settings' },
      ] },
      { label: 'Use Sokra in your setting', items: [
        { slug: 'modes/school' },
        { slug: 'modes/enterprise' },
        { slug: 'modes/higher-education' },
        { slug: 'modes/personal' },
      ] },
      { label: 'Help', items: [{ slug: 'help/troubleshooting' }] },
    ],
  })],
});
