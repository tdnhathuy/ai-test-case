import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET
		})
	],
	secret: process.env.AUTH_SECRET
});
