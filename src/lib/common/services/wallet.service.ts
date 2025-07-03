import { api } from '@/lib/common/configs/api.config';
import type { Wallet } from '@/lib/common/types/app.type';
import { route } from '@/lib/ROUTES';

export const ServiceWallet = {
	getWallet: () => {
		return api.get<Wallet[]>('GET /api/profile/wallet');
	},

	createWallet: (payload: PayloadCreateWallet) => {
		return api.post<Wallet>('POST /api/profile/wallet', payload);
	},
	updateWallet: (payload: PayloadUpdateWallet) => {
		const url = route('PATCH /api/profile/wallet/[id]', { id: payload.wallet.id });
		return api.patch<Wallet>(url, payload);
	},
	deleteWallet: (id: string) => {
		const url = route('DELETE /api/profile/wallet/[id]', { id });
		return api.del<Wallet>(url);
	}
};

export interface PayloadCreateWallet {
	wallet: Omit<Wallet, 'id'>;
}

export interface PayloadUpdateWallet {
	wallet: Wallet;
}
