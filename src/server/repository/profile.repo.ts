import { DEFAULT_CATEGORY, DEFAULT_ICON } from '@/lib/common/configs/default-values.config';
import { genMongoId } from '@/lib/common/helpers/func.helper';
import { ProfileModel, type IProfile } from '@/lib/common/zod/profile.zod';

export const getProfileByEmail = async (email: string) => {
	return await ProfileModel.findOne({ email });
};

export const createNewProfile = async (email: string) => {
	console.log('DEFAULT_CATEGORY', DEFAULT_CATEGORY);

	const newProfile: IProfile = {
		_id: genMongoId(),
		email,
		category: DEFAULT_CATEGORY,
		icon: DEFAULT_ICON,
		transaction: []
	};

	return await ProfileModel.create(newProfile);
};
