// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// This GitLab Pages project uses a "unique domain" and serves from the root
// (https://qti3-doc-ac52af.pages.bks.kennisnet.nl/), so no base path is needed.
// If it were served under a subpath instead, set this to e.g. '/qti3-doc' and
// add the same prefix to the hero links in src/content/docs/index.mdx.
// The GitHub Pages workflow serves from a subpath and overrides these via env.
const BASE = process.env.BASE_PATH ?? '';
const SITE = process.env.SITE_URL ?? 'https://qti3-doc-ac52af.pages.bks.kennisnet.nl';
const EDIT_BASE_URL =
	process.env.EDIT_BASE_URL ?? 'https://gitlab.bks.kennisnet.nl/visser01/qti3-doc/-/edit/main/';
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;

/**
 * Prefix root-relative links/sources in Markdown & MDX prose with the base path.
 * Starlight base-prefixes its own navigation and asset URLs, but not the
 * root-relative links authored in page content — this rehype pass fixes those so
 * every cross-reference works under the subpath. (Links passed to components use
 * the withBase() helper instead.)
 */
function rehypeBasePaths() {
	const walk = (node) => {
		if (node.type === 'element' && node.properties) {
			for (const attr of ['href', 'src']) {
				const v = node.properties[attr];
				if (
					typeof v === 'string' &&
					v.startsWith('/') &&
					!v.startsWith('//') &&
					!v.startsWith(BASE + '/') &&
					v !== BASE
				) {
					node.properties[attr] = BASE + v;
				}
			}
		}
		if (node.children) node.children.forEach(walk);
	};
	return (tree) => walk(tree);
}

// https://astro.build/config
export default defineConfig({
	// Used for sitemap/canonical URLs.
	site: SITE,
	base: BASE + '/',
	markdown: {
		rehypePlugins: [rehypeBasePaths],
	},
	vite: {
		// @citolab/qti-components ships CSS that lightningcss refuses to minify;
		// use the more tolerant esbuild minifier instead.
		build: { cssMinify: 'esbuild' },
	},
	integrations: [
		starlight({
			title: 'QTI 3.0 Docs',
			description:
				'A practical, developer- and product-focused guide to the 1EdTech QTI 3.0 specification.',
			// Pagefind search is enabled by default.
			social: [
				{
					icon: 'github',
					label: 'php-qti3',
					href: 'https://github.com/kennisnet/php-qti3',
				},
			],
			head: GOOGLE_SITE_VERIFICATION
				? [
						{
							tag: 'meta',
							attrs: { name: 'google-site-verification', content: GOOGLE_SITE_VERIFICATION },
						},
					]
				: [],
			customCss: ['./src/styles/custom.css'],
			editLink: {
				baseUrl: EDIT_BASE_URL,
			},
			lastUpdated: true,
			sidebar: [
				{
					label: 'Onboarding',
					items: [{ autogenerate: { directory: 'onboarding' } }],
				},
				{
					label: 'Core concepts',
					items: [{ autogenerate: { directory: 'concepts' } }],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Overview', slug: 'reference' },
						{ label: 'Shared attributes', slug: 'reference/shared-attributes' },
						{
							label: 'Interactions',
							items: [{ autogenerate: { directory: 'reference/interactions' } }],
						},
						{
							label: 'Content & structure',
							items: [{ autogenerate: { directory: 'reference/content' } }],
						},
						{
							label: 'Test structure',
							items: [{ autogenerate: { directory: 'reference/test' } }],
						},
						{
							label: 'Variables & processing',
							items: [{ autogenerate: { directory: 'reference/processing' } }],
						},
						{
							label: 'Packaging & metadata',
							items: [{ autogenerate: { directory: 'reference/packaging' } }],
						},
					],
				},
				{
					label: 'Guides',
					items: [{ autogenerate: { directory: 'guides' } }],
				},
			],
		}),
	],
});
