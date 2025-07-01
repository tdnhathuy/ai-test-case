import type { IProfile } from '@/lib/common/schema';
import type { Profile } from '@/lib/common/types';
import { DTOCategory, DTOIcon, DTOTransaction, DTOWallet } from '@/server/dto';

export const DTOProfile = {
	fromModel: (profile: IProfile): Profile => {
		return {
			email: profile.email,
			id: profile._id.toString(),
			icon: DTOIcon.fromProfile(profile),
			category: DTOCategory.fromProfile(profile),
			transaction: DTOTransaction.fromProfile(profile),
			wallet: DTOWallet.fromProfile(profile)
		};
	}
};
