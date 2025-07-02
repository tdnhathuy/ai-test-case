import { getDefaultIconByProfile, responseError, responseSuccess } from '@/lib/common/helpers';
import type { PayloadCreateWallet } from '@/lib/common/services/wallet.service.js';
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

	const payload = (await request.json()) as PayloadCreateWallet;

	if (!profile) return responseError('Profile not found', 'PROFILE_NOT_FOUND');

	const idIcon = payload.wallet.icon?.id || getDefaultIconByProfile(profile)._id.toString();

	profile.wallet.push({
		...payload.wallet,
		_id: new ObjectId(),
		idIcon: idIcon
	});
	await profile.save({});

	return responseSuccess({
		data: 'ok'
	});
};
