export enum EnumCollection {
	Profile = 'profile'
}

export type ICollection = keyof typeof EnumCollection;

export enum EnumIconCode {
	Empty = 'Empty'
}
export type IIconCode = keyof typeof EnumIconCode;

export enum EnumIconType {
	Default = 'default',
	Custom = 'custom'
}
export type IIconType = keyof typeof EnumIconType;
