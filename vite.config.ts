import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { kitRoutes } from 'vite-plugin-kit-routes';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), kitRoutes()],
	server: {
		fs: {
			// Cho phép serving files từ root project
			allow: ['..']
		}
	}
});
