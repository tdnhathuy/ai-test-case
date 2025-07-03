import { responseError, responseSuccess } from '@/lib/common/helpers';
import { ProfileModel } from '@/lib/common/schema/app.schema';
import { validateInfo } from '@/lib/common/server';
import { DTOProfile } from '@/server/dto';
import { createNewProfile } from '@/server/repository/profile.repo';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const { email } = await validateInfo(event);

	await ProfileModel.deleteOne({ email });
	await createNewProfile(email);

	const updatedProfile = await ProfileModel.findOne({ email });

	if (updatedProfile) {
		return responseSuccess({ profile: DTOProfile.fromModel(updatedProfile) });
	}

	return responseError('Profile not found', 'PROFILE_NOT_FOUND');
};
