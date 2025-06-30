import type { IProfile } from '@/lib/common/zod/profile.zod';

export const DTOWallet = {
	fromProfile: (profile: IProfile) => {
		return profile.wallet.map((wallet) => ({
			id: wallet._id.toString(),
			name: wallet.name,
			balance: wallet.balance
		}));
	}
};
