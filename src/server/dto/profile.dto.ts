import type { Profile } from '@/lib/common/types/app.type';
import type { IProfile } from '@/lib/common/zod/profile.zod';
import { DTOCategory, DTOIcon, DTOTransaction } from '@/server/dto';

export const DTOProfile = {
	fromModel: (profile: IProfile): Profile => {
		return {
			email: profile.email,
			id: profile._id.toString(),
			icon: DTOIcon.fromProfile(profile),
			category: DTOCategory.fromProfile(profile),
			transaction: DTOTransaction.fromProfile(profile)
		};
	}
};
