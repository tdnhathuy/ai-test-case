import { convertIdFlatIcon } from '@/lib/common/helpers';
import type { IProfile } from '@/lib/common/schema/app.schema';
import type { Icon } from '@/lib/common/types/app.type';
import { ObjectId } from 'mongodb';

export const DTOIcon = {
	fromProfile: (profile: IProfile): Icon[] => {
		return profile.icon.map((icon) => ({
			id: icon._id.toString(),
			code: icon.code ?? '',
			url: convertIdFlatIcon(icon.code ?? '') ?? ''
		}));
	},

	getIconById: (profile: IProfile, id: string | ObjectId): Icon => {
		const icon = profile.icon.find((icon) => icon._id.toString() === id.toString());
		return {
			id: icon?._id.toString() ?? '',
			code: icon?.code ?? '',
			url: convertIdFlatIcon(icon?.code ?? '') ?? ''
		};
	}
};
