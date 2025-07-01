import { responseError, responseSuccess } from '@/lib/common/helpers';
import { ProfileModel } from '@/lib/common/schema/app.schema';
import { DTOIcon } from '@/server/dto';

export const GET = async ({ locals }) => {
	const info = await locals.auth();
	const { user } = info || {};

	if (!user) {
		return responseError('User not found', 'USER_NOT_FOUND');
	}

	const email = user.email;

	const profile = await ProfileModel.findOne({ email });

	if (!profile) {
		return responseError('Profile not found', 'PROFILE_NOT_FOUND');
	}

	return responseSuccess({
		data: DTOIcon.fromProfile(profile)
	});
};
