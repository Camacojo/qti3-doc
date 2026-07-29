// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// GitLab Pages (project) serves under a subpath, so the site needs a base.
// Change to '' for root/"unique-domain" hosting (and drop the base from the
// hero links in src/content/docs/index.mdx).
const BASE = '/qti3-doc';

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
	// `site` is used for sitemap/canonical URLs — update the host to the real
	// Pages domain once known.
	site: 'https://visser01.pages.bks.kennisnet.nl',
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
			customCss: ['./src/styles/custom.css'],
			editLink: {
				baseUrl: 'https://github.com/kennisnet/qti3-doc/edit/main/',
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
