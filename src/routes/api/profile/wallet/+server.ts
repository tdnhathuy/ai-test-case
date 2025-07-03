import { getDefaultIconByProfile, responseSuccess } from '@/lib/common/helpers';
import { validateInfo } from '@/lib/common/server/helper.server.js';
import type { PayloadCreateWallet } from '@/lib/common/services/wallet.service.js';
import { DTOWallet } from '@/server/dto/wallet.dto.js';
import { ObjectId } from 'mongodb';

export const GET = async (event) => {
	const { profile } = await validateInfo(event);
	return responseSuccess({ data: DTOWallet.fromProfile(profile) });
};

export const POST = async (event) => {
	const { profile } = await validateInfo(event);
	const payload = (await event.request.json()) as PayloadCreateWallet;

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
