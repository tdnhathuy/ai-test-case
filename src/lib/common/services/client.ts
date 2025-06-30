import { browser } from '$app/environment';
import { getCachedAuthToken } from '@/lib/common/helpers';
import axios from 'axios';

export const client = axios.create({ baseURL: 'http://localhost:3000' });

client.interceptors.request.use(async (config) => {
	config.headers['Content-Type'] = 'application/json';

	if (browser) {
		const token = await getCachedAuthToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}

	return config;
});
