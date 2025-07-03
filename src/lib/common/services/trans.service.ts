import { api } from '@/lib/common/configs/api.config';
import type { Transaction } from '@/lib/common/types/app.type';
import { route } from '@/lib/ROUTES';

export const ServiceTrans = {
	getTrans: async () => {
		return api.get<Transaction[]>(route('GET /api/profile/transaction'));
	},
	createTrans: async (payload: PayloadCreateTrans) => {
		return api.post(route('POST /api/profile/transaction'), payload);
	}
};

export interface PayloadCreateTrans {
	transaction: Transaction;
}
