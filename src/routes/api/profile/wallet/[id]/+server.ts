import { responseError, responseSuccess } from '@/lib/common/helpers';
import { ProfileModel } from '@/lib/common/schema/app.schema';
import type { PayloadUpdateWallet } from '@/lib/common/services';
import type { RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
	try {
		const info = await locals.auth();
		const email = info?.user?.email;
		if (!email) return responseError('401', 'Unauthorized');

		const walletId = params.id;
		if (!walletId) return responseError('400', 'Wallet id is required');

		const payload = (await request.json()) as PayloadUpdateWallet;
		console.log('Received category:', payload);

		if (!payload || Object.keys(payload).length === 0)
			return responseError('400', 'Nothing to update');

		// Build setFields cho $set với logging chi tiết
		const setFields: Record<string, any> = {};

		if (payload.wallet.name !== undefined) {
			setFields['wallet.$.name'] = payload.wallet.name;
			console.log('Setting name:', payload.wallet.name);
		}

		if (payload.wallet.icon?.id) {
			setFields['wallet.$.idIcon'] = payload.wallet.icon.id;
			console.log('Setting icon id:', payload.wallet.icon.id);
		}

		if (payload.wallet.type !== undefined) {
			setFields['wallet.$.type'] = payload.wallet.type;
			console.log('Setting type:', payload.wallet.type);
		}

		if (payload.wallet.initBalance !== undefined) {
			setFields['wallet.$.initBalance'] = payload.wallet.initBalance;
			console.log('Setting initBalance:', payload.wallet.initBalance);
		}

		console.log('Final setFields:', setFields);

		if (Object.keys(setFields).length === 0) {
			return responseError('400', 'No valid fields to update');
		}

		const result = await ProfileModel.updateOne(
			{
				email,
				'wallet._id': walletId
			},
			{
				$set: setFields
			}
		);

		console.log('Update result:', result);

		if (result.matchedCount === 0) return responseError('404', 'Category not found');

		return responseSuccess({
			modified: result.modifiedCount,
			matched: result.matchedCount,
			walletId,
			updatedFields: setFields
		});
	} catch (err) {
		console.error('Update category error:', err);
		return responseError('500', 'Internal server error');
	}
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	try {
		const info = await locals.auth();
		const email = info?.user?.email;
		if (!email) return responseError('401', 'Unauthorized');

		const walletId = params.id;
		if (!walletId) return responseError('400', 'Wallet id is required');

		// Kiểm tra và xóa wallet trong một operation
		const result = await ProfileModel.findOneAndUpdate(
			{
				email,
				'wallet._id': walletId
			},
			{
				$pull: {
					wallet: { _id: walletId }
				}
			},
			{
				new: false, // Trả về document trước khi update
				runValidators: true
			}
		);

		console.log('Delete result:', result);

		if (!result) {
			return responseError('404', 'Wallet not found');
		}

		return responseSuccess({
			message: 'Wallet deleted successfully',
			walletId,
			deletedFrom: result.email
		});
	} catch (err) {
		console.error('Delete wallet error:', err);
		return responseError('500', 'Internal server error');
	}
};
