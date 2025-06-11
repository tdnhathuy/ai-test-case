import { configCallbacks, configSession, ProviderGoogle } from '@/lib/configs/auth.config';
import { SvelteKitAuth } from '@auth/sveltekit';

export const { handle, signIn, signOut } = SvelteKitAuth({
	secret: process.env.AUTH_SECRET,
	providers: [ProviderGoogle],
	session: configSession,
	callbacks: configCallbacks
});
