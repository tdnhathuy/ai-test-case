import type { Icon } from '@/lib/common/types/app.type';
import type { IProfile, IIcon } from '@/lib/common/zod/profile.zod';

export const DTOIcon = {
	fromProfile: (profile: IProfile): Icon[] => {
		return profile.icon.map((icon) => ({
			id: icon._id.toString(),
			url: icon.url,
			code: icon.code
		}));
	}
};
