import { api } from '@/lib/common/configs/api.config';
import type { Transaction } from '@/lib/common/types/app.type';
import { route } from '@/lib/ROUTES';

export const ServiceTrans = {
	getTrans: async () => {
		return api.get<Transaction[]>(route('GET /api/profile/transaction'));
	},
	createTrans: async (payload: PayloadCreateTrans) => {
		return api.post(route('POST /api/profile/transaction'), payload);
	},
	updateTrans: async (payload: PayloadUpdateTrans) => {
		const url = route('PATCH /api/profile/transaction/[id]', { id: payload.transaction.id });
		return api.patch(url, payload);
	}
};

export interface PayloadCreateTrans {
	transaction: Transaction;
}

export interface PayloadUpdateTrans {
	transaction: Transaction;
}
