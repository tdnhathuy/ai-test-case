import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const getIdUrl = (event: RequestEvent, key: string = 'id') => {
	const id = event.params[key];
	if (!id) throw error(400, `${key} is required`);
	return id;
};

export const getBody = async <T>(event: RequestEvent): Promise<T> => {
	const body = await event.request.json();
	return body as T;
};

