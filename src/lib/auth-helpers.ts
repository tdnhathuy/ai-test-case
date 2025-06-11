import { browser } from '$app/environment';

// Helper function to get JWT token from session
export async function getAuthToken(): Promise<string | null> {
	if (!browser) return null;
	
	try {
		const response = await fetch('/api/auth/session');
		const session = await response.json();
		return session?.accessToken || null;
	} catch (error) {
		console.error('Error getting auth token:', error);
		return null;
	}
}

// Helper function to make authenticated API calls
export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
	const token = await getAuthToken();
	
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...(options.headers as Record<string, string> || {}),
	};
	
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}
	
	return fetch(url, {
		...options,
		headers,
	});
}

// Helper function to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
	const token = await getAuthToken();
	return !!token;
} 