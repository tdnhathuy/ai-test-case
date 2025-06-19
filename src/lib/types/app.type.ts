import { createJsonSchema } from '@/lib/helpers/func.helper';
import { z } from 'zod/v4';

const zodChecklist = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	priority: z.enum(['P0', 'P1', 'P2']),
	checked: z.boolean().optional()
});

export type ChecklistItem = z.infer<typeof zodChecklist>;

export const schemaChecklist = createJsonSchema(zodChecklist);
