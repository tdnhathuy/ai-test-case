import type { Icon } from '@/lib/common/types/app.type';
import type { IProfile, IIcon } from '@/lib/common/zod/profile.zod';

export const DTOIcon = {
	fromProfile: (profile: IProfile): Icon[] => {
		return profile.icon.map((icon) => ({
			id: icon._id.toString(),
			url: icon.url,
			code: icon.code
		}));
	},

	getIconById: (profile: IProfile, id: string): Icon => {
		const icon = profile.icon.find((icon) => icon._id.toString() === id);
		return {
			id: icon?._id.toString() ?? '',
			url: icon?.url ?? '',
			code: icon?.code ?? ''
		};
	}
};
