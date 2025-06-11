import type { SvelteKitAuthConfig } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';

export const ProviderGoogle = Google({
	clientId: process.env.AUTH_GOOGLE_ID,
	clientSecret: process.env.AUTH_GOOGLE_SECRET,
	authorization: {
		params: {
			prompt: 'consent',
			access_type: 'offline',
			response_type: 'code'
		}
	}
});

export const configSession: SvelteKitAuthConfig['session'] = {
	strategy: 'jwt',
	maxAge: 30 * 24 * 60 * 60, // 30 days
	updateAge: 24 * 60 * 60 // 24 hours,
};

export const configCallbacks: SvelteKitAuthConfig['callbacks'] = {
	async jwt({ token, user, account }) {
		if (account) {
			token.accessToken = account.access_token;
			token.refreshToken = account.refresh_token;
		}
		if (user) {
			token.id = user.id;
		}
		return token;
	},
	async session({ session, token }) {
		if (token.accessToken) {
			session.accessToken = token.accessToken as string;
		}
		if (token.id) {
			session.user.id = token.id as string;
		}
		return session;
	}
};
