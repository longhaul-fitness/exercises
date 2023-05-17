import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vitest/config';

const BASE_URL = process.env.NODE_ENV === 'production' ? '/exercises' : '';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'development',
			strategies: 'generateSW',
			scope: `${BASE_URL}/`,
			selfDestroying: process.env.SELF_DESTROYING_SW === 'true',
			buildBase: `${BASE_URL}/`,
			manifest: {
				name: 'Long Haul Fitness',
				short_name: 'LHF',
				description: 'Free and open source list of fitness exercises',
				start_url: `${BASE_URL}/`,
				scope: `${BASE_URL}/`,
				base: BASE_URL,
				display: 'standalone',
				theme_color: '#1c4b82',
				icons: [
					{
						src: `${BASE_URL}/pwa-192x192.png`,
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: `${BASE_URL}/pwa-512x512.png`,
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: `${BASE_URL}/pwa-512x512.png`,
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: '/'
			},
			// if you have shared info in svelte config file put in a separate module and use it also here
			kit: {}
		})
	],
	server: {
		fs: {
			// Allow serving files from one level up to the project root
			allow: ['..']
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
