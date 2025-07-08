import type { IProfile } from '@/lib/common/schema';
import type { PayloadGetTrans } from '@/lib/common/services';
import type { Transaction } from '@/lib/common/types/app.type';
import { DTOCategory } from '@/server/dto/category.dto';
import { DTOWallet } from '@/server/dto/wallet.dto';

export const DTOTransaction = {
	fromProfile: (profile: IProfile, filter?: PayloadGetTrans): Transaction[] => {
		if (filter?.unclassified) {
			return profile.transaction
				.filter((trans) => !trans.idCategory)
				.map((x) => ({
					id: x._id.toString(),
					amount: x.amount,
					date: x.date.toISOString(),
					description: x.description ?? '',
					category: null,
					wallet: null
				}));
		}

		return profile.transaction.map((trans) => {
			const idCategoryStr = trans.idCategory?.toString();
			const idWalletStr = trans.idWallet?.toString();

			const category = DTOCategory.fromProfileAndId(profile, idCategoryStr ?? '');
			const wallet = DTOWallet.fromProfileAndId(profile, idWalletStr ?? '');

			return {
				id: trans._id.toString(),
				amount: trans.amount,
				date: trans.date.toISOString(),
				description: trans.description ?? '',
				category: category,
				wallet: wallet
			};
		});
	}
};
