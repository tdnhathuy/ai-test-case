import type { Transaction } from '@/lib/common/types/app.type';
import type { ITransaction } from '@/lib/common/zod/profile.zod';

export const DTOTransaction = {
	fromModel: (transaction: ITransaction): Transaction => {
		return {
			id: transaction._id.toString(),
			amount: transaction.amount,
			date: transaction.date.toISOString(),
			description: transaction.description || ''
		};
	}
};
