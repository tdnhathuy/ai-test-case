import { api } from '@/lib/common/configs/api.config';
import type { Transaction } from '@/lib/common/types/app.type';
import { route } from '@/lib/ROUTES';

export const ServiceTrans = {
	getTrans: async (params?: PayloadGetTrans) => {
		const url = route('GET /api/profile/transaction');
		return api.get<Transaction[]>(url, { params });
	},
	createTrans: async (payload: PayloadCreateTrans) => {
		return api.post(route('POST /api/profile/transaction'), payload);
	},
	updateTrans: async (payload: PayloadUpdateTrans) => {
		const url = route('PUT /api/profile/transaction/[id]', { id: payload.transaction.id });
		return api.put(url, payload);
	}
};

export interface PayloadGetTrans {
	unclassified?: boolean;
}

export interface PayloadCreateTrans {
	transaction: Transaction;
}

export interface PayloadUpdateTrans {
	transaction: Transaction;
}
