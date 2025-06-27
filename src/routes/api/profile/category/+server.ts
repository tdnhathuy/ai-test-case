import { responseError, responseSuccess } from '@/lib/common/helpers/api.helper';
import { ProfileModel } from '@/lib/common/zod/profile.zod';
import type { RequestHandler } from './$types';
import { DTOCategory } from '@/server/dto/category.dto';

export const GET: RequestHandler = async ({ locals }) => {
	const info = await locals.auth();
	const { user } = info || {};

	if (!user) {
		return responseError('User not found', 'USER_NOT_FOUND');
	}

	const profile = await ProfileModel.findOne({ email: user.email });

	if (!profile) {
		return responseError('Profile not found', 'PROFILE_NOT_FOUND');
	}

	return responseSuccess({
		data: profile.category.map((category) => DTOCategory.fromModel(profile, category))
	});
};
