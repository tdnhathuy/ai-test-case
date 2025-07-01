import { createMutation } from '@tanstack/svelte-query';
import { ServiceWallet } from '@/lib/common/services';
import type { Wallet } from '@/lib/common/types/app.type';

export const useCreateWallet = () => {
	return createMutation({
		mutationFn: async (wallet: Wallet) => {
			return await ServiceWallet.createWallet(wallet);
		}
	});
};
