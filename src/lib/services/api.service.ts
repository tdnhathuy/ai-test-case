import type { Checklist } from '@/lib/types/app.type';
import { client } from './client';

export const createChecklist = async (description: string) => {
	const response = await client.post<{ checklist: Checklist[] }>('/api/checklist', { description });
	console.log('response', response.data.checklist);
	return response.data.checklist;
};
