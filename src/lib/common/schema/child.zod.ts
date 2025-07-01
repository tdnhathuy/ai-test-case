import {
	EnumCategoryType,
	EnumIconCode,
	EnumIconType,
	EnumWalletType,
	type ICategoryType,
	type IIconCode,
	type IIconType,
	type IWalletType
} from '@/lib/common/enum/collection.enum';
import { extendZod, zId } from '@zodyac/zod-mongoose';
import { z } from 'zod';

extendZod(z);

export const zodIdCommon = zId();

export const zodIcon = z.object({
	_id: zodIdCommon,
	url: z.string(),
	code: z.enum(Object.keys(EnumIconCode) as [IIconCode, ...IIconCode[]]),
	type: z.enum(Object.keys(EnumIconType) as [IIconType, ...IIconType[]])
});

// Chỉ lưu ObjectId cho các field reference (idIcon, idCategory, idWallet, idParent)

export const zodWallet = z.object({
	_id: zodIdCommon,
	idIcon: zodIdCommon, // chỉ ObjectId, không phải { _id: ... }
	name: z.string(),
	initBalance: z.number(),
	type: z.enum(Object.keys(EnumWalletType) as [IWalletType, ...IWalletType[]])
});

export const zodCategory = z.object({
	_id: zodIdCommon,
	idIcon: zodIdCommon, // chỉ ObjectId
	name: z.string(),
	idParent: zodIdCommon.optional().nullable(), // chỉ ObjectId hoặc null
	type: z.enum(Object.keys(EnumCategoryType) as [ICategoryType, ...ICategoryType[]])
});

export const zodTransaction = z.object({
	_id: zodIdCommon,
	amount: z.number(),
	date: z.date(),
	description: z.string().optional(),

	idIcon: zodIdCommon, // chỉ ObjectId
	idCategory: zodIdCommon, // chỉ ObjectId
	idWallet: zodIdCommon // chỉ ObjectId
});
