import type { IProfile } from '@/lib/common/schema';
import type { Wallet } from '@/lib/common/types/app.type';
import { DTOIcon } from '@/server/dto/icon.dto';

export const DTOWallet = {
	fromProfile: (profile: IProfile): Wallet[] => {
		return profile.wallet.map((wallet) => {
			return {
				id: wallet._id.toString(),
				name: wallet.name,
				// balance: wallet.initBalance,
				icon: DTOIcon.getIconById(profile, wallet.idIcon),
				type: wallet.type,
				idIcon: wallet.idIcon.toString(),
				initBalance: wallet.initBalance
			};
		});
	}
};
