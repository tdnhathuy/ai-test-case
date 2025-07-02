import type { EnumCategoryType, ICategoryType } from '@/lib/common/enum/collection.enum';
import type { Session } from '@auth/sveltekit';

export interface BasePageProps {
	session: Session | null;
}

export interface Profile {
	id: string;
	wallet: Wallet[];
	category: Category[];
	transaction: Transaction[];
	icon: Icon[];
	email: string;
}
export interface Category {
	id: string;
	name: string;
	icon: Icon | null;
	children?: Category[];
	type: ICategoryType;
	idParent: string | null;
}
export interface Transaction {
	id: string;
	amount: number;
	date: string;
	description: string;
}
export interface Icon {
	id: string;
	url: string;
	code: string;
	type: string;
}
export interface Wallet {
	id: string;
	name: string;
	icon: Icon;
	initBalance: number;
}
