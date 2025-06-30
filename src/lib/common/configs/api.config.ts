import type { KIT_ROUTES } from '$lib/ROUTES';
import { route } from '$lib/ROUTES';
import type { AxiosRequestConfig } from 'axios';
import { browser } from '$app/environment';
import { getCachedAuthToken } from '@/lib/common/helpers';
import axios from 'axios';

type RouteKey = keyof KIT_ROUTES['SERVERS'];
type BuiltUrl = ReturnType<typeof route>;

const isRouteKey = (u: RouteKey | BuiltUrl): u is RouteKey => /^[A-Z]+ /.test(u);
const build = (u: RouteKey | BuiltUrl): BuiltUrl => (isRouteKey(u) ? route(u as any) : u);

const client = axios.create({ baseURL: 'http://localhost:3000' });

client.interceptors.request.use(async (config) => {
	config.headers['Content-Type'] = 'application/json';
	if (browser) {
		const token = await getCachedAuthToken();
		if (token) config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

async function request<T, D = unknown>(
	method: 'get' | 'post' | 'put' | 'patch' | 'delete',
	url: RouteKey | BuiltUrl,
	data?: D,
	config?: AxiosRequestConfig
): Promise<T> {
	const res = await client.request<{ data: T }>({
		method,
		url: build(url),
		...(data !== undefined ? { data } : {}),
		...config
	});
	return res.data.data;
}

const api = {
	get: <T>(url: RouteKey | BuiltUrl, config?: AxiosRequestConfig) =>
		request<T>('get', url, undefined, config),
	post: <T, D = unknown>(url: RouteKey | BuiltUrl, data?: D, config?: AxiosRequestConfig) =>
		request<T, D>('post', url, data, config),
	put: <T, D = unknown>(url: RouteKey | BuiltUrl, data?: D, config?: AxiosRequestConfig) =>
		request<T, D>('put', url, data, config),
	patch: <T, D = unknown>(url: RouteKey | BuiltUrl, data?: D, config?: AxiosRequestConfig) =>
		request<T, D>('patch', url, data, config),
	del: <T>(url: RouteKey | BuiltUrl, config?: AxiosRequestConfig) =>
		request<T>('delete', url, undefined, config)
};

export { api };
