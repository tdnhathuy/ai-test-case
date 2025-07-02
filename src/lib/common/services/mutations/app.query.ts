import { QueryKeys } from '@/lib/common/constant/key.const';
import { createQuery } from '@tanstack/svelte-query';
import { ServiceCategory } from '../category.service';
import { ServiceWallet } from '../wallet.service';

export const useGetListWallet = () => {
	return createQuery({
		queryKey: [QueryKeys.getWallet],
		queryFn: ServiceWallet.getWallet
	});
};

export const useGetListCategory = () => {
	return createQuery({
		queryKey: [QueryKeys.getCategory],
		queryFn: ServiceCategory.getCategory
	});
};
