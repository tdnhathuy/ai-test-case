export enum EnumCollection {
	Profile = 'profile'
}

export type ICollection = keyof typeof EnumCollection;

export enum EnumIconCode {
	Empty = 'Empty',
	Default = 'Default'
}
export type IIconCode = keyof typeof EnumIconCode;

export enum EnumIconType {
	Default = 'Default',
	Custom = 'Custom'
}
export type IIconType = keyof typeof EnumIconType;

export enum EnumWalletType {
	Cash = 'Cash',
	Debit = 'Debit',
	Credit = 'Credit',
	Crypto = 'Crypto'
}
export type IWalletType = keyof typeof EnumWalletType;

export enum EnumCategoryType {
	Expense = 'Expense',
	Income = 'Income',
	Transfer = 'Transfer'
}
export type ICategoryType = keyof typeof EnumCategoryType;
