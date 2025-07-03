import { getBody, getIdUrl, responseError, responseSuccess } from '@/lib/common/helpers';
import { createId, validateInfo } from '@/lib/common/server';
import type { PayloadUpdateTrans } from '@/lib/common/services';
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const PUT: RequestHandler = async (event) => {
	const { profile } = await validateInfo(event);
	const id = getIdUrl(event);
	const payload = await getBody<PayloadUpdateTrans>(event);

	const index = profile.transaction.findIndex((x) => x._id.toString() === id);
	if (index === -1) {
		return responseError('Transaction not found', 'TRANSACTION_NOT_FOUND');
	}

	profile.transaction[index] = {
		...payload.transaction,
		_id: new ObjectId(id),
		date: new Date(payload.transaction.date),
		idCategory: createId(payload.transaction.category?.id),
		idWallet: createId(payload.transaction.wallet?.id),
		amount: Number(payload.transaction.amount),
		description: payload.transaction.description ?? ''
	};

	await profile.save();

	return responseSuccess({
		message: 'Transaction updated successfully',
		transactionId: id
	});
};

export const DELETE: RequestHandler = async (event) => {
	const { profile } = await validateInfo(event);
	const id = getIdUrl(event);

	profile.transaction.filter((x) => x._id.toString() !== id);
	await profile.save();

	return responseSuccess({
		message: 'Transaction deleted successfully',
		transactionId: id
	});
};
