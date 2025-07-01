import { api } from '@/lib/common/configs/api.config';
import type { Wallet } from '@/lib/common/types/app.type';
import { route } from '@/lib/ROUTES';

export const ServiceWallet = {
	getWallet: () => {
		return api.get<Wallet[]>('GET /api/profile/wallet');
	},
	createWallet: (payload: PayloadCreateWallet) => {
		return api.post<Wallet>('POST /api/profile/wallet', payload);
	}
};

export interface PayloadCreateWallet {
	name: string;
	balance: number;
	icon: string;
}
