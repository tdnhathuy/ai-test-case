import axios from 'axios';
import { browser } from '$app/environment';
import { getCachedAuthToken } from '@/lib/common/helpers/auth.helper';

export const client = axios.create();

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
