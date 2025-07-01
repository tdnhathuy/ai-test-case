import { MutationKeys } from '@/lib/common/constant/key.const';
import { ServiceCategory, ServiceWallet } from '@/lib/common/services';
import { createMutation } from '@tanstack/svelte-query';

export const useCreateWallet = () => {
	return createMutation({
		mutationKey: [MutationKeys.createWallet],
		mutationFn: ServiceWallet.createWallet
	});
};



export const useUpdateCategory = () => {
	return createMutation({
		mutationKey: [MutationKeys.updateCategory],
		mutationFn: ServiceCategory.updateCategory
	});
};	