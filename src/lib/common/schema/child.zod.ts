import {
	EnumCategoryType,
	EnumIconType,
	EnumWalletType,
	type ICategoryType,
	type IIconType,
	type IWalletType
} from '@/lib/common/enum/collection.enum';
import { extendZod, zId } from '@zodyac/zod-mongoose';
import { z } from 'zod';

extendZod(z);

export const zodIdCommon = zId();

export const zodIcon = z.object({
	_id: zodIdCommon,
	url: z.string().optional().nullable(),
	code: z.string().optional().nullable(),
	type: z.enum(Object.keys(EnumIconType) as [IIconType, ...IIconType[]])
});

export const zodIconCollection = z.object({
	_id: zodIdCommon,
	name: z.string(),
	icon: z.array(zodIcon)
});

export const zodWallet = z.object({
	_id: zodIdCommon,
	idIcon: zodIdCommon,
	name: z.string(),
	initBalance: z.number(),
	type: z.enum(Object.keys(EnumWalletType) as [IWalletType, ...IWalletType[]])
});

export const zodCategory = z.object({
	_id: zodIdCommon,
	idIcon: zodIdCommon,
	name: z.string(),
	idParent: zodIdCommon.optional().nullable(),
	type: z.enum(Object.keys(EnumCategoryType) as [ICategoryType, ...ICategoryType[]])
});

export const zodTransaction = z.object({
	_id: zodIdCommon,
	amount: z.number(),
	date: z.date(),
	description: z.string().optional().nullable(),
	idCategory: zodIdCommon.optional().nullable(),
	idWallet: zodIdCommon.optional().nullable()
});
