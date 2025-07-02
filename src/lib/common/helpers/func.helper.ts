import type { IIcon, IProfile } from '@/lib/common/schema/app.schema';
import objectId from 'bson-objectid';

export const genMongoId = (): string => {
	return objectId().toString();
};

export const genIconByUrl = (url: string): IIcon => {
	return {
		_id: genMongoId(),
		code: 'Default',
		type: 'Default',
		url
	};
};

export const getDefaultIconByProfile = (profile: IProfile): IIcon => {
	return profile.icon[0];
};
