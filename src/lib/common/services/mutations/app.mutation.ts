import { queryClient } from '@/lib/common/configs/query-client.config';
import { MutationKeys, QueryKeys } from '@/lib/common/constant/key.const';
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
		mutationFn: ServiceCategory.updateCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.getCategory] });
		}
	});
};

export const useCreateCategory = () => {
	return createMutation({
		mutationKey: [MutationKeys.createCategory],
		mutationFn: ServiceCategory.createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.getCategory] });
		}
	});
};

export const useDeleteCategory = () => {
	return createMutation({
		mutationKey: [MutationKeys.deleteCategory],
		mutationFn: ServiceCategory.deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.getCategory] });
		}
	});
};
