import axios from 'axios';
import { browser } from '$app/environment';

export const client = axios.create();

client.interceptors.request.use(async (config) => {
	config.headers['Content-Type'] = 'application/json';

	// Get session token from NextAuth session API
	if (browser) {
		try {
			const response = await fetch('/api/auth/session');
			const session = await response.json();
			console.log('session', session);
			
			// Sử dụng session token hoặc access token
			const token = session?.accessToken || session?.sessionToken;
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
				console.log('Added Authorization header with token');
			} else {
				console.log('No token found in session');
			}
		} catch (error) {
			console.error('Failed to get session:', error);
		}
	}
	
	return config;
});
