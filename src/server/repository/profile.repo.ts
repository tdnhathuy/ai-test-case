import { createCategory, createDefaultIcon } from '@/lib/common/configs/default-values.config';
import { ProfileModel, type IProfile } from '@/lib/common/schema/app.schema';
import { ObjectId } from 'mongodb';

export const createNewProfile = async (email: string) => {
	try {
		await ProfileModel.findOneAndDelete({ email });
	} catch (error) {}

	const newProfile: IProfile = {
		_id: new ObjectId(),
		email,
		icon: createDefaultIcon(),
		category: [],
		transaction: [],
		wallet: []
	};

	const profile = await ProfileModel.create(newProfile);

	const arr = createCategory(profile);

	profile.category = arr;

	await profile.save();

	return profile;
};
