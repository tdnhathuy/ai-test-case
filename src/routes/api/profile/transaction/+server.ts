import { responseError, responseSuccess } from '@/lib/common/helpers';
import type { PayloadCreateTrans } from '@/lib/common/services';
import { DTOTransaction } from '@/server/dto';
import type { RequestHandler } from './$types';
import { ObjectId } from 'mongodb';
import { getProfileByEmail } from '@/server/repository';
import { ProfileModel } from '@/lib/common/schema';

export const GET: RequestHandler = async ({ locals, url }) => {
	const user = (await locals.auth())?.user;
	if (!user) return responseError('User not found', 'USER_NOT_FOUND');

	const email = user.email!;
	const profile = await getProfileByEmail(email);
	if (!profile) return responseError('Profile not found', 'PROFILE_NOT_FOUND');
	return responseSuccess({ data: DTOTransaction.fromProfile(profile) });
};

export const POST: RequestHandler = async ({ locals, request }) => {
	const user = (await locals.auth())?.user;
	if (!user) return responseError('User not found', 'USER_NOT_FOUND');

	const { transaction } = (await request.json()) as PayloadCreateTrans;

	const email = user.email!;
	const result = await ProfileModel.findOneAndUpdate(
		{ email: email },
		{ $push: { transaction: { ...transaction, _id: new ObjectId(transaction.id) } } },
		{ returnDocument: 'after' }
	);

	if (!result) return responseError('Transaction not found', 'TRANSACTION_NOT_FOUND');
	return responseSuccess({ data: DTOTransaction.fromProfile(result) });
};
