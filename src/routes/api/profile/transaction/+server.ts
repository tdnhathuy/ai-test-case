import { getBody, responseSuccess } from '@/lib/common/helpers';
import { validateInfo } from '@/lib/common/server';
import type { PayloadCreateTrans } from '@/lib/common/services';
import { DTOTransaction } from '@/server/dto';
import { ObjectId } from 'mongodb';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const { profile } = await validateInfo(event);
	return responseSuccess({ data: DTOTransaction.fromProfile(profile) });
};

export const POST: RequestHandler = async (event) => {
	const { profile } = await validateInfo(event);

	const { transaction } = await getBody<PayloadCreateTrans>(event);

	const idCategory = transaction.category?.id ? new ObjectId(transaction.category.id) : null;
	const idWallet = transaction.wallet?.id ? new ObjectId(transaction.wallet.id) : null;

	if (!profile.transaction) {
		profile.transaction = [];
		await profile.save();
	}

	profile.transaction.push({
		...transaction,
		date: new Date(transaction.date),
		_id: new ObjectId(),
		idCategory,
		idWallet
	});

	await profile.save();
	return responseSuccess({ data: DTOTransaction.fromProfile(profile) });
};
