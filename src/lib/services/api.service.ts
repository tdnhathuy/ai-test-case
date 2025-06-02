import { client } from './client';

export const createChecklist = async (description: string) => {
	const response = await client.post('/api/checklist', { description });
	return response.data.checklist;
};
