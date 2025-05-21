import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const auth = await locals.auth();

	if (auth) {
		redirect(302, '/home');
	}

	redirect(302, '/auth');
};
