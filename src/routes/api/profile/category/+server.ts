import { responseError, responseSuccess } from '@/lib/common/helpers';
import { ProfileModel } from '@/lib/common/schema/app.schema';
import { DTOCategory } from '@/server/dto';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	const info = await locals.auth();
	const { user } = info || {};

	if (!user) {
		return responseError('User not found', 'USER_NOT_FOUND');
	}

	const email = user.email as string;

	const profile = await ProfileModel.findOne({ email });

	if (!profile) {
		return responseError('Profile not found', 'PROFILE_NOT_FOUND');
	}

	return responseSuccess({
		data: DTOCategory.fromProfile(profile)
	});
};
