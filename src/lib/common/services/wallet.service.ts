import { api } from '@/lib/common/configs/api.config';
import type { Wallet } from '@/lib/common/types/app.type';

export const ServiceWallet = {
	getWallet: async () => {
		return api.get<Wallet>('GET /api/profile/wallet');
	},
	createWallet: async (payload: PayloadCreateWallet) => {
		return api.post<Wallet>('POST /api/profile/wallet', payload);
	}
};

export interface PayloadCreateWallet {
	name: string;
	balance: number;
}
