import { queryClient } from '@/lib/common/configs/query-client.config';
import { MutationKeys, QueryKeys } from '@/lib/common/constant/key.const';
import { ServiceCategory, ServiceTrans, ServiceWallet } from '@/lib/common/services';
import { createMutation } from '@tanstack/svelte-query';

export const useCreateWallet = () => {
	return createMutation({
		mutationKey: [MutationKeys.createWallet],
		mutationFn: ServiceWallet.createWallet,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.getWallet] });
		}
	});
};

export const useUpdateWallet = () => {
	return createMutation({
		mutationKey: [MutationKeys.updateWallet],
		mutationFn: ServiceWallet.updateWallet,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.getWallet] });
		}
	});
};

export const useDeleteWallet = () => {
	return createMutation({
		mutationKey: [MutationKeys.deleteWallet],
		mutationFn: ServiceWallet.deleteWallet,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.getWallet] });
		}
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

export const useCreateTrans = () => {
	return createMutation({
		mutationKey: [MutationKeys.createTrans],
		mutationFn: ServiceTrans.createTrans,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.getTrans] });
		}
	});
};

export const useUpdateTrans = () => {
	return createMutation({
		mutationKey: [MutationKeys.updateTrans],
		mutationFn: ServiceTrans.updateTrans,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.getTrans] });
		}
	});
};
