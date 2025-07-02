import { getDefaultIconByProfile, responseError, responseSuccess } from '@/lib/common/helpers';
import { ProfileModel } from '@/lib/common/schema/app.schema';
import { DTOCategory } from '@/server/dto';
import type { RequestHandler } from './$types';
import type { Category } from '@/lib/common/types';
import { ObjectId } from 'mongodb';

export const GET: RequestHandler = async ({ locals }) => {
	const info = await locals.auth();
	const { user } = info || {};

	if (!user) {
		return responseError('User not found', 'USER_NOT_FOUND');
	}

	const email = user.email as string;

	const profile = await ProfileModel.findOne({ email });

	if (!profile) {
		return responseError('Profile not found', 'PROFILE_NOT_FOUND');
	}

	return responseSuccess({
		data: DTOCategory.fromProfile(profile)
	});
};

export const POST: RequestHandler = async ({ locals, request }) => {
	const info = await locals.auth();
	const { user } = info || {};

	if (!user) {
		return responseError('User not found', 'USER_NOT_FOUND');
	}

	const email = user.email as string;

	const body = (await request.json()) as Category;

	const profile = await ProfileModel.findOne({ email });

	if (!profile) {
		return responseError('Profile not found', 'PROFILE_NOT_FOUND');
	}

	const idIcon = body.icon?.id || getDefaultIconByProfile(profile)._id.toString();

	profile.category.push({
		_id: new ObjectId(),
		type: body.type,
		idIcon,
		name: body.name,
		idParent: null
	});

	await profile.save();

	return responseSuccess({
		data: body
	});
};
