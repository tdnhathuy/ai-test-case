import { CDNIcon, flatIcon } from '@/lib/common/configs/cdn.config';
import type { IIcon, IProfile } from '@/lib/common/schema/app.schema';
import type { Transaction } from '@/lib/common/types';
import type { Category } from '@/lib/common/types/app.type';
import objectId from 'bson-objectid';

export const genMongoId = (): string => {
	return objectId().toString();
};

export const genIconByUrl = (url: string): IIcon => {
	return {
		_id: genMongoId(),
		code: 'Default',
		type: 'Default',
		url
	};
};

export const getDefaultIconByProfile = (profile: IProfile): IIcon => {
	return profile.icon[0];
};

export const genDefaultTrans = (transaction?: Transaction): Transaction => {
	return {
		id: transaction?.id ?? genMongoId(),
		amount: transaction?.amount ?? 0,
		date: transaction?.date ?? new Date().toISOString(),
		description: transaction?.description ?? '',
		category: transaction?.category ?? null,
		wallet: transaction?.wallet ?? null
	};
};

export const getListIncome = (listCategory: Category[]): Category[] => {
	return listCategory.filter((category) => category.type === 'Income');
};

export const getListExpense = (listCategory: Category[]): Category[] => {
	return listCategory.filter((category) => category.type === 'Expense');
};

export const convertIdFlatIcon = (iconId: string): string => {
	const id = String(iconId);
	let prefix;
	if (id.length <= 3) {
		prefix = id;
	} else {
		prefix = id.slice(0, id.length - 3);
	}
	return `https://cdn-icons-png.flaticon.com/512/${prefix}/${id}.png`;
};
