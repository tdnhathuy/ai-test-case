import { responseError, responseSuccess } from '@/lib/common/helpers';
import { validateInfo } from '@/lib/common/server';
import { createNewProfile } from '@/server/repository/profile.repo';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	try {
		await validateInfo(event);
	} catch (error) {
	} finally {
		const user = (await event.locals.auth())?.user;
		if (user?.email) {
			await createNewProfile(user.email);
		}
	}
	return responseSuccess('Profile created successfully');
};
