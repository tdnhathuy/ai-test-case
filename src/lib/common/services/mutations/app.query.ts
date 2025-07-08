import { QueryKeys } from '@/lib/common/constant/key.const';
import { ServiceTrans, type PayloadGetTrans } from '@/lib/common/services/trans.service';
import { createQuery } from '@tanstack/svelte-query';
import { ServiceCategory } from '../category.service';
import { ServiceIcon } from '../icon.service';
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

export const useGetListIcon = () => {
	return createQuery({
		queryKey: [QueryKeys.getIcon],
		queryFn: ServiceIcon.getIcon
	});
};

export const useGetListTrans = (params?: PayloadGetTrans) => {
	const queryKey = [QueryKeys.getTrans, JSON.stringify(params)];
	return createQuery({
		queryKey: queryKey,
		queryFn: () => ServiceTrans.getTrans(params),
		refetchOnMount: true
	});
};

export const useGetListIconCollection = () => {
	return createQuery({
		queryKey: [QueryKeys.getIconCollection],
		queryFn: ServiceIcon.getIconCollection
	});
};
