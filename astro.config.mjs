// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// Update `site` once a hosting target is chosen (used for sitemap & canonical URLs).
	site: 'https://qti3-docs.example.com',
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
