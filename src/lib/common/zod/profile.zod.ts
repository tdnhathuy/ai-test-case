import {
	EnumIconCode,
	EnumIconType,
	type IIconCode,
	type IIconType
} from '@/lib/common/enum/collection.enum';

import { extendZod, zId, zodSchema } from '@zodyac/zod-mongoose';
import mongoose, { type HydratedDocument, type Model } from 'mongoose';
import { z } from 'zod';

extendZod(z);
const { model, models } = mongoose;

const zodIdCommon = zId();
const categoryId = zId('Category');
const iconId = zId('Icon');

const zodIcon = z.object({
	_id: zodIdCommon,
	url: z.string(),
	code: z.enum(Object.keys(EnumIconCode) as [IIconCode, ...IIconCode[]]),
	type: z.enum(Object.keys(EnumIconType) as [IIconType, ...IIconType[]])
});

const zodBaseCategory = z.object({
	_id: zodIdCommon,
	icon: iconId,
	name: z.string()
});

const zodChildCategory = z.object({
	...zodBaseCategory.shape
});

const zodCategory = z.object({
	...zodBaseCategory.shape,
	children: z.array(zodChildCategory).default([])
});

const zodTransaction = z.object({
	_id: zodIdCommon,
	category: categoryId,
	icon: iconId,
	amount: z.number(),
	date: z.date(),
	description: z.string().optional()
});

export const zodProfile = z.object({
	_id: zodIdCommon,
	email: z.string().email(),
	category: z.array(zodCategory),
	transaction: z.array(zodTransaction),
	icon: z.array(zodIcon)
});

function transform(_: any, ret: any) {
	ret.id = ret._id;
	delete ret._id;
}
const SchemaProfile = zodSchema(zodProfile, {
	versionKey: false,
	skipVersioning: {
		versionKey: false
	},
	toJSON: { virtuals: true, transform },
	toObject: { virtuals: true, transform }
});

export const ProfileModel: IProfileModel =
	models.Profile || model<IProfile>('Profile', SchemaProfile);

export type IProfile = z.infer<typeof zodProfile>;
export type IProfileModel = Model<HydratedDocument<IProfile>>;

export type IIcon = z.infer<typeof zodIcon>;
export type ITransaction = z.infer<typeof zodTransaction>;
export type ICategory = z.infer<typeof zodCategory>;
export type IChildCategory = z.infer<typeof zodChildCategory>;
