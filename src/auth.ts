import { configCallbacks, configSession, ProviderGoogle } from '@/lib/common/configs/auth.config';
import { SvelteKitAuth } from '@auth/sveltekit';

export const { handle, signIn, signOut } = SvelteKitAuth({
	secret: process.env.AUTH_SECRET,
	trustHost: true,
	providers: [ProviderGoogle],
	session: configSession,
	callbacks: configCallbacks
});
