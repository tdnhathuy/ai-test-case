import { responseError, responseSuccess } from '@/lib/common/helpers/api.helper';
import { ProfileModel } from '@/lib/common/zod/profile.zod';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	const info = await locals.auth();
	const { user } = info || {};

	if (!user) {
		return responseError('User not found', 'USER_NOT_FOUND');
	}

	const profile = await ProfileModel.findOne({ email: user.email });

	return responseSuccess({
		category: profile?.category || []
	});
};
