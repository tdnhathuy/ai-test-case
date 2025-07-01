import {
	createDefaultCategory,
	createDefaultIcon
} from '@/lib/common/configs/default-values.config';
import { ProfileModel, type IProfile } from '@/lib/common/schema/app.schema';
import { ObjectId } from 'mongodb';

export const getProfileByEmail = async (email: string) => {
	return await ProfileModel.findOne({ email });
};

export const createNewProfile = async (email: string) => {
	const newProfile: IProfile = {
		_id: new ObjectId(),
		email,
		category: createDefaultCategory(),
		icon: createDefaultIcon(),
		transaction: [],
		wallet: []
	};

	return await ProfileModel.create(newProfile);
};
