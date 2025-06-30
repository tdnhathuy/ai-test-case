import type { Session } from '@auth/sveltekit';
import { z } from 'zod/v4';

export interface BasePageProps {
	session: Session | null;
}

const zodBaseCategory = z.object({
	id: z.string(),
	name: z.string(),
	icon: z.string()
});

const zodChildCategory = z.object({
	...zodBaseCategory.shape
});

const zodCategory = z.object({
	...zodBaseCategory.shape,
	children: z.array(zodChildCategory).default([])
});

const zodTransaction = z.object({
	id: z.string(),
	amount: z.number(),
	date: z.string(),
	description: z.string()
});

const zodIcon = z.object({
	id: z.string(),
	url: z.string(),
	code: z.string()
});

const zodProfile = z.object({
	id: z.string(),
	email: z.string(),
	category: z.array(zodCategory),
	transaction: z.array(zodTransaction),
	icon: z.array(zodIcon)
});

export type Profile = z.infer<typeof zodProfile>;
export type Category = z.infer<typeof zodCategory>;
export type ChildCategory = z.infer<typeof zodChildCategory>;
export type Transaction = z.infer<typeof zodTransaction>;
export type Icon = z.infer<typeof zodIcon>;
