import type { RequestHandler } from '@sveltejs/kit';
import { Types } from 'mongoose';
import { ProfileModel } from '@/lib/common/zod/profile.zod';
import { responseError, responseSuccess } from '@/lib/common/helpers/api.helper';

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
	try {
		const info = await locals.auth();
		const email = info?.user?.email;
		if (!email) return responseError('401', 'Unauthorized');

		const categoryId = params.id;
		if (!categoryId) return responseError('400', 'Category id is required');

		const body = await request.json(); // { name?, icon?, parentId? }
		if (!body || Object.keys(body).length === 0) return responseError('400', 'Nothing to update');

		// Build setFields cho $set
		const setFields: Record<string, any> = {};
		if ('name' in body) setFields['category.$.name'] = body.name;
		if ('icon' in body) setFields['category.$.icon'] = body.icon;
		if ('parentId' in body)
			setFields['category.$.parentId'] = body.parentId ? new Types.ObjectId(body.parentId) : null;

		// Cập nhật đúng 1 category trong mảng profile.category
		const result = await ProfileModel.updateOne(
			{
				email,
				'category._id': categoryId // filter mảng theo _id phần tử
			},
			{
				$set: setFields
			}
		);

		if (result.matchedCount === 0) return responseError('404', 'Category not found');

		return responseSuccess({ modified: result.modifiedCount });
	} catch (err) {
		console.error(err);
		return responseError('500', 'Internal server error');
	}
};
