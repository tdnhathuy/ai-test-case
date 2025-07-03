import type { IProfile } from '@/lib/common/schema/app.schema';
import type { Category } from '@/lib/common/types/app.type';
import { DTOIcon } from '@/server/dto/icon.dto';

export const DTOCategory = {
	fromProfile: (profile: IProfile): Category[] => {
		const allCategories = profile.category || [];

		const allParents = allCategories.filter((c) => !c.idParent);
		const allChildren = allCategories.filter((c) => c.idParent);

		return allParents.map((c) => {
			const children = allChildren.filter(
				({ idParent }) => idParent?.toString() === c._id.toString()
			);

			return {
				id: c._id.toString(),
				name: c.name,
				icon: DTOIcon.getIconById(profile, c.idIcon),
				children: children.map((child) => ({
					id: child._id.toString(),
					name: child.name,
					icon: DTOIcon.getIconById(profile, child.idIcon),
					type: child.type,
					idParent: child.idParent?.toString() ?? null
				})),
				type: c.type,
				idParent: c.idParent?.toString() ?? null
			};
		});
	},

	fromProfileAndId: (profile: IProfile, id: string): Category => {
		const category = profile.category.find((c) => c._id.toString() === id);
		return {
			id: category?._id.toString() ?? '',
			name: category?.name ?? '',
			icon: DTOIcon.getIconById(profile, category?.idIcon ?? ''),
			type: category?.type ?? 'Expense',
			idParent: category?.idParent?.toString() ?? null
		};
	}
};
