import {
	zodCategory,
	zodIcon,
	zodIdCommon,
	zodTransaction,
	zodWallet
} from '@/lib/common/schema/child.zod';
import { extendZod, zId } from '@zodyac/zod-mongoose';
import { z } from 'zod';

extendZod(z);

export const zodProfile = z.object({
	_id: zodIdCommon,
	email: z.string().email(),
	category: z.array(zodCategory),
	transaction: z.array(zodTransaction),
	wallet: z.array(zodWallet),
	icon: z.array(zodIcon)
});
