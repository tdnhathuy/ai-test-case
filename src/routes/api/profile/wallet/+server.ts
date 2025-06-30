import { responseError, responseSuccess } from '@/lib/common/helpers';
import { DTOWallet } from '@/server/dto';
import { getProfileByEmail } from '@/server/repository';

export const GET = async ({ locals }) => {
	const user = (await locals.auth())?.user;
	const email = user?.email!;
	const profile = await getProfileByEmail(email);

	if (!profile) return responseError('Profile not found', 'PROFILE_NOT_FOUND');

	return responseSuccess({
		data: DTOWallet.fromProfile(profile)
	});
};
