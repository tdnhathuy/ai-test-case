import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	try {
		const session = await locals.auth();
		return json(session);
	} catch (error) {
		console.error('Error getting session:', error);
		return json(null);
	}
};
