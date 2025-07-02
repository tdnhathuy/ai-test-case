import { responseError, responseSuccess } from '@/lib/common/helpers';
import { ProfileModel } from '@/lib/common/schema/app.schema';
import type { Category } from '@/lib/common/types/app.type';
import type { RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
	try {
		const info = await locals.auth();
		const email = info?.user?.email;
		if (!email) return responseError('401', 'Unauthorized');

		const categoryId = params.id;
		if (!categoryId) return responseError('400', 'Category id is required');

		const body = (await request.json()) as { category: Category };

		const { category } = body;

		if (!body || Object.keys(body).length === 0) return responseError('400', 'Nothing to update');

		// Build setFields cho $set
		const setFields: Record<string, any> = {};
		if ('name' in category) setFields['category.$.name'] = category.name;
		if ('icon' in category) setFields['category.$.idIcon'] = category.icon.id;
		if ('parentId' in category) setFields['category.$.parentId'] = category.parentId;
		if ('type' in category) setFields['category.$.type'] = category.type;

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
