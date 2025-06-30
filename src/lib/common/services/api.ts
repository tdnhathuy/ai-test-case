// src/lib/common/services/api.ts
import type { AxiosRequestConfig } from 'axios';
import { client } from './client';
import { route } from '$lib/ROUTES';
import type { KIT_ROUTES } from '$lib/ROUTES';

/* ---------- Kiểu chung ---------- */
type RouteKey = keyof KIT_ROUTES['SERVERS']; // "GET /api/..."
type BuiltUrl = ReturnType<typeof route>; // "/api/profile/123"

/* Dùng regex rất nhanh để nhận biết key */
const isRouteKey = (u: RouteKey | BuiltUrl): u is RouteKey => /^[A-Z]+ /.test(u); // GET / POST / PUT ...

const build = (u: RouteKey | BuiltUrl): BuiltUrl => (isRouteKey(u) ? route(u as any) : u);

/* ---------- GET ---------- */
function get<T, K extends RouteKey>(url: K, config?: AxiosRequestConfig): Promise<T>;
function get<T>(url: BuiltUrl, config?: AxiosRequestConfig): Promise<T>;
async function get<T>(url: RouteKey | BuiltUrl, config?: AxiosRequestConfig): Promise<T> {
	const res = await client.get<{ data: T }>(build(url), config);
	return res.data.data;
}

/* ---------- POST ---------- */
function post<T, K extends RouteKey, Data = unknown>(
	url: K,
	data?: Data,
	config?: AxiosRequestConfig
): Promise<T>;

function post<T, Data = unknown>(
	url: BuiltUrl,
	data?: Data,
	config?: AxiosRequestConfig
): Promise<T>;

async function post<T>(
	url: RouteKey | BuiltUrl,
	data?: unknown,
	config?: AxiosRequestConfig
): Promise<T> {
	const res = await client.post<{ data: T }>(build(url), data, config);
	return res.data.data;
}

/* ---------- PUT ---------- */
function put<T, K extends RouteKey, Data = unknown>(
	url: K,
	data?: Data,
	config?: AxiosRequestConfig
): Promise<T>;

function put<T, Data = unknown>(
	url: BuiltUrl,
	data?: Data,
	config?: AxiosRequestConfig
): Promise<T>;

async function put<T>(
	url: RouteKey | BuiltUrl,
	data?: unknown,
	config?: AxiosRequestConfig
): Promise<T> {
	const res = await client.put<{ data: T }>(build(url), data, config);
	return res.data.data;
}

/* ---------- PATCH ---------- */
function patch<T, K extends RouteKey, Data = unknown>(
	url: K,
	data?: Data,
	config?: AxiosRequestConfig
): Promise<T>;

function patch<T, Data = unknown>(
	url: BuiltUrl,
	data?: Data,
	config?: AxiosRequestConfig
): Promise<T>;

async function patch<T>(
	url: RouteKey | BuiltUrl,
	data?: unknown,
	config?: AxiosRequestConfig
): Promise<T> {
	const res = await client.patch<{ data: T }>(build(url), data, config);
	return res.data.data;
}

/* ---------- DELETE ---------- */
function del<T, K extends RouteKey>(url: K, config?: AxiosRequestConfig): Promise<T>;
function del<T>(url: BuiltUrl, config?: AxiosRequestConfig): Promise<T>;
async function del<T>(url: RouteKey | BuiltUrl, config?: AxiosRequestConfig): Promise<T> {
	const res = await client.delete<{ data: T }>(build(url), config);
	return res.data.data;
}

/* ---------- Xuất ra một object gọn gàng ---------- */
export const api = {
	get,
	post,
	put,
	patch,
	delete: del // “delete” là từ khoá JS
};
