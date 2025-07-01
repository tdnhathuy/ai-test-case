import { responseError, responseSuccess } from '@/lib/common/helpers';
import { DTOWallet } from '@/server/dto/wallet.dto.js';
import { getProfileByEmail } from '@/server/repository';
import { ObjectId } from 'mongodb';

export const GET = async ({ locals }) => {
	const user = (await locals.auth())?.user;
	const email = user?.email!;
	const profile = await getProfileByEmail(email);
	if (!profile) return responseError('Profile not found', 'PROFILE_NOT_FOUND');
	return responseSuccess({ data: DTOWallet.fromProfile(profile) });
};

export const POST = async ({ locals, request }) => {
	const user = (await locals.auth())?.user;

	const email = user?.email!;
	const profile = await getProfileByEmail(email);

	const wallet = await request.json();

	if (!profile) return responseError('Profile not found', 'PROFILE_NOT_FOUND');

	profile.wallet.push({ ...wallet, _id: new ObjectId() });
	await profile.save({});

	return responseSuccess({
		data: 'ok'
	});
};
