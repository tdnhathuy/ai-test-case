import { responseError, responseSuccess } from '@/lib/common/helpers';
import { connectMongo } from '@/lib/common/server/mongoose';
import { ProfileModel } from '@/lib/common/zod/profile.zod';
import { DTOProfile } from '@/server/dto';
import { createNewProfile, getProfileByEmail } from '@/server/repository/profile.repo';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
	const user = (await locals.auth())?.user;
	if (!user) return responseError('User not found', 'USER_NOT_FOUND');

	await connectMongo();

	const isForceSetup = url.searchParams.get('forceSetup') === 'true';
	const email = user.email!;

	const existing = await getProfileByEmail(email);

	if (!existing) {
		await createNewProfile(email);
	}

	if (isForceSetup) {
		await ProfileModel.deleteOne({ email });
		await createNewProfile(email);
	}

	const profile = await ProfileModel.findOne({ email });

	if (profile) {
		return responseSuccess({ profile: DTOProfile.fromModel(profile) });
	}

	return responseError('Profile not found', 'PROFILE_NOT_FOUND');
};
