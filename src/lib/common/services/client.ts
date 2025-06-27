import axios from 'axios';
import { browser } from '$app/environment';
import { getCachedAuthToken } from '@/lib/common/helpers/auth.helper';
import { route, type KIT_ROUTES } from '@/lib/ROUTES';

export const client = axios.create({ baseURL: 'http://localhost:3000' });

client.interceptors.request.use(async (config) => {
	config.headers['Content-Type'] = 'application/json';

	if (browser) {
		const token = await getCachedAuthToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}

	console.log('config', config);
	return config;
});

export const api = {
	get: async <T>(url: keyof KIT_ROUTES['SERVERS']) => {
		const response = await client.get<{ data: T }>(route(url));
		return response.data.data;
	}
};
