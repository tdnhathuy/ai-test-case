import { browser } from '$app/environment';
import type { Session } from '@auth/sveltekit';
import axios from 'axios';

type Response = { session: Session };
const clientRequest = axios.create();
const fetchAccessToken = () => clientRequest.get<Response>('/api/auth/session');

let tokenCache: {
	token: string | null;
	expiresAt: number;
} = {
	token: null,
	expiresAt: 0
};

export async function getAuthToken(): Promise<string | null> {
	if (!browser) return null;

	try {
		const response = await fetchAccessToken();
		return response.data?.session?.accessToken || null;
	} catch (error) {
		console.error('Error getting auth token:', error);
		return null;
	}
}

export async function getCachedAuthToken(): Promise<string | null> {
	if (!browser) return null;

	const now = Date.now();

	if (tokenCache.token && now < tokenCache.expiresAt) {
		return tokenCache.token;
	}

	try {
		const response = await fetch('/api/auth/session');
		const session = await response.json();
		const token = session?.accessToken || null;

		const MINUTES = 5;
		const expiresAt = now + MINUTES * 60 * 1000;
		tokenCache = { token, expiresAt };

		console.log('Token refreshed:', !!token);
		return token;
	} catch (error) {
		console.error('Failed to get cached auth token:', error);
		tokenCache = { token: null, expiresAt: 0 };
		return null;
	}
}
