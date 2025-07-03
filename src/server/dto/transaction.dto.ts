import type { IProfile } from '@/lib/common/schema';
import type { Transaction } from '@/lib/common/types/app.type';
import { DTOCategory } from '@/server/dto/category.dto';
import { DTOWallet } from '@/server/dto/wallet.dto';

export const DTOTransaction = {
	fromProfile: (profile: IProfile): Transaction[] => {
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
