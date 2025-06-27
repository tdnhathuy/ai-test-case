import type { Profile } from '@/lib/common/types/app.type';
import type { IProfile } from '@/lib/common/zod/profile.zod';
import { DTOCategory } from '@/server/dto/category.dto';
import { DTOTransaction } from '@/server/dto/transaction.dto';

export const DTOProfile = {
	fromModel: (profile: IProfile): Profile => {
		return {
			id: profile._id.toString(),
			email: profile.email,
			category: profile.category.map((category) => DTOCategory.fromModel(profile, category)),
			transaction: profile.transaction.map(DTOTransaction.fromModel)
		};
	}
};
