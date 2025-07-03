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
	},
	fromProfileAndId: (profile: IProfile, id: string): Wallet => {
		const wallet = profile.wallet.find((w) => w._id.toString() === id);
		return {
			id: wallet?._id.toString() ?? '',
			name: wallet?.name ?? '',
			icon: DTOIcon.getIconById(profile, wallet?.idIcon ?? ''),
			initBalance: wallet?.initBalance ?? 0,
			type: wallet?.type ?? 'Cash'
		};
	}
};
