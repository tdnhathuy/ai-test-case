import type { Category } from '@/lib/common/types/app.type';
import type { IProfile } from '@/lib/common/zod/profile.zod';

export const DTOCategory = {
	fromProfile: (profile: IProfile): Category[] => {
		const allCategories = profile.category || [];
		const allChildren = allCategories.filter((c) => c.parentId);

		return allCategories
			.filter((c) => !c.parentId)
			.map((c) => ({
				id: c._id.toString(),
				name: c.name,
				icon: profile.icon.find((icon) => icon._id.toString() === c.icon.toString())?.url || '',
				children: allChildren
					.filter((child) => child.parentId === c._id.toString())
					.map((child) => ({
						id: child._id.toString(),
						name: child.name,
						icon:
							profile.icon.find((icon) => icon._id.toString() === child.icon.toString())?.url || ''
					}))
			}));
	}
};
