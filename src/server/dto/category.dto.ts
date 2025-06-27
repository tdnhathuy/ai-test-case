import type { Category, ChildCategory } from '@/lib/common/types/app.type';
import type { ICategory, IChildCategory, IProfile } from '@/lib/common/zod/profile.zod';

const DTOChildCategory = (profile: IProfile, category: IChildCategory): ChildCategory => {
	return {
		id: category._id.toString(),
		name: category.name,
		icon: profile.icon.find((icon) => icon._id.toString() === category.icon.toString())?.url || ''
	};
};

export const DTOCategory = {
	fromModel: (profile: IProfile, category: ICategory): Category => {
		return {
			id: category._id.toString(),
			name: category.name,
			icon:
				profile.icon.find((icon) => icon._id.toString() === category.icon.toString())?.url || '',
			children: (category.children || []).map((child) => DTOChildCategory(profile, child)) || []
		};
	}
};
