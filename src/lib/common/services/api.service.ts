import type { ChecklistItem } from '@/lib/types/app.type';
import { route } from '@/lib/ROUTES';
import type { Step1Data } from '@/modules/create-test-case/stores/create-test-case.store';
import { client } from './client';

export const createChecklist = async (payload: Step1Data) => {
	const response = await client.post(route('POST /api/checklist'), payload);
	return response.data.data as ChecklistItem[];
};
