import {
	createDefaultCategory,
	createDefaultIcon
} from '@/lib/common/configs/default-values.config';
import { genMongoId } from '@/lib/common/helpers/';
import { ProfileModel, type IProfile } from '@/lib/common/zod/profile.zod';

export const getProfileByEmail = async (email: string) => {
	return await ProfileModel.findOne({ email });
};

export const createNewProfile = async (email: string) => {
	const newProfile: IProfile = {
		_id: genMongoId(),
		email,
		category: createDefaultCategory(),
		icon: createDefaultIcon(),
		transaction: [],
		wallet: []
	};

	return await ProfileModel.create(newProfile);
};
