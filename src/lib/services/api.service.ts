import type { Checklist } from '@/lib/types/app.type';
import { client } from './client';
import { route } from '@/lib/ROUTES';



export const createChecklist = async ({ description }: { description: string }) => {
	const response = await client.post<{ checklist: Checklist[] }>(route('POST /api/checklist'), {
		description
	});
	console.log('response', response.data.checklist);
	return response.data.checklist;
};
