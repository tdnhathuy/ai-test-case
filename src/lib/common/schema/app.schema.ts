import { zodProfile } from '@/lib/common/schema/app.zod';
import type { zodCategory, zodIcon, zodTransaction } from '@/lib/common/schema/child.zod';

import { extendZod, zodSchema } from '@zodyac/zod-mongoose';
import mongoose, { type HydratedDocument, type Model } from 'mongoose';
import { z } from 'zod';

extendZod(z);
const { model, models } = mongoose;

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

export type IProfile = z.infer<typeof zodProfile>;
export type IIcon = z.infer<typeof zodIcon>;
export type ITransaction = z.infer<typeof zodTransaction>;
export type ICategory = z.infer<typeof zodCategory>;

export type IProfileModel = Model<HydratedDocument<IProfile>>;
export const ProfileModel: IProfileModel =
	models.Profile || model<IProfile>('Profile', SchemaProfile);
