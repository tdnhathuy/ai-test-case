import type { Wallet } from '@/lib/common/types/app.type';
import type { IProfile } from '@/lib/common/zod/profile.zod';
import { DTOIcon } from '@/server/dto/icon.dto';

export const DTOWallet = {
	fromProfile: (profile: IProfile): Wallet[] => {
		return profile.wallet.map((wallet) => {
			return {
				id: wallet._id.toString(),
				name: wallet.name,
				balance: wallet.balance,
				icon: DTOIcon.getIconById(profile, wallet.icon.toString()).url
			};
		});
	}
};
