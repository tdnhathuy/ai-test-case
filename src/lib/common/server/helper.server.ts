import type { IIconCollectionModel, IProfile, IProfileModel } from '@/lib/common/schema';
import { createNewProfile } from '@/server/repository/profile.repo';
import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import type { HydratedDocument } from 'mongoose';

interface AuthenticatedProfileResult extends RequestEvent {
	profile: HydratedDocument<IProfile>;
	user: any;
	email: string;
	ProfileModel: IProfileModel;
	IconCollectionModel: IIconCollectionModel;
}

export async function validateInfo(event: RequestEvent): Promise<AuthenticatedProfileResult> {
	const user = (await event.locals.auth())?.user;
	if (!user) {
		throw error(401, 'User not found');
	}

	const { ProfileModel, IconCollectionModel } = await import('@/lib/common/schema');

	const profile = await ProfileModel.findOne({ email: user.email });

	if (!profile) {
		throw error(401, 'Profile not found');
	}

	return { profile, user, email: user.email!, ProfileModel, IconCollectionModel, ...event };
}

export const createId = (id: string | undefined) => {
	if (!id) return null;
	return new ObjectId(id);
};
