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
