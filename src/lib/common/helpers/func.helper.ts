import type { IIcon } from '@/lib/common/schema/app.schema';
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
