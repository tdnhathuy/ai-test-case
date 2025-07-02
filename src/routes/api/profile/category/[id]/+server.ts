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

		const category = (await request.json()) as Category;
		console.log('Received category:', category);

		if (!category || Object.keys(category).length === 0)
			return responseError('400', 'Nothing to update');

		// Build setFields cho $set với logging chi tiết
		const setFields: Record<string, any> = {};

		if (category.name !== undefined) {
			setFields['category.$.name'] = category.name;
			console.log('Setting name:', category.name);
		}

		if (category.icon?.id) {
			setFields['category.$.idIcon'] = category.icon.id;
			console.log('Setting icon id:', category.icon.id);
		}

		// QUAN TRỌNG: Database dùng 'idParent' chứ không phải 'parentId'
		if (category.idParent !== undefined) {
			setFields['category.$.idParent'] = category.idParent;
			console.log('Setting idParent (from parentId):', category.idParent);
		}

		if (category.type !== undefined) {
			setFields['category.$.type'] = category.type;
			console.log('Setting type:', category.type);
		}

		console.log('Final setFields:', setFields);

		if (Object.keys(setFields).length === 0) {
			return responseError('400', 'No valid fields to update');
		}

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

		console.log('Update result:', result);

		if (result.matchedCount === 0) return responseError('404', 'Category not found');

		return responseSuccess({
			modified: result.modifiedCount,
			matched: result.matchedCount,
			categoryId,
			updatedFields: setFields
		});
	} catch (err) {
		console.error('Update category error:', err);
		return responseError('500', 'Internal server error');
	}
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	const info = await locals.auth();
	const email = info?.user?.email;
	if (!email) return responseError('401', 'Unauthorized');

	const categoryId = params.id;
	if (!categoryId) return responseError('400', 'Category id is required');

	const profile = await ProfileModel.findOne({ email });

	if (!profile) return responseError('404', 'Profile not found');

	profile.category = profile.category.filter((x) => x._id.toString() !== categoryId);

	await profile.save();

	return responseSuccess({
		message: 'Category deleted successfully'
	});
};
