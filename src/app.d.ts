import type { DefaultSession } from '@auth/sveltekit';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Extend NextAuth types
declare module '@auth/sveltekit' {
	interface Session {
		accessToken?: string;
		user: {
			id: string;
		} & DefaultSession['user'];
	}

	interface JWT {
		accessToken?: string;
		refreshToken?: string;
		id?: string;
	}
}

export {};
