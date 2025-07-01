import { MutationKeys } from '@/lib/common/constant/key.const';
import { ServiceWallet } from '@/lib/common/services';
import { createMutation } from '@tanstack/svelte-query';

export const useCreateWallet = () => {
	return createMutation({
		mutationKey: [MutationKeys.createWallet],
		mutationFn: ServiceWallet.createWallet
	});
};
