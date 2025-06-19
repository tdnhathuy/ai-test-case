import { AIModel } from '@/lib/helpers/ai-model.helper';
import { responseSuccess } from '@/lib/helpers/api.helper';
import { buildChecklistPrompt } from '@/lib/helpers/promp.helper';
import { schemaChecklist, type ChecklistItem } from '@/lib/types/app.type';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Step1Data } from '@/modules/create-test-case/stores/create-test-case.store';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = (await request.json()) as Step1Data;
		const { userStory, acceptanceCriteria } = body;

		if (!userStory || !acceptanceCriteria) {
			return json({ error: 'User story and acceptance criteria are required' }, { status: 400 });
		}

		const prompt = buildChecklistPrompt({ userStory, acceptanceCriteria });

		const checklist = await AIModel.getInstance().prompting<ChecklistItem[]>(prompt, {
			responseMimeType: 'application/json',
			temperature: 0.5,
			responseSchema: {
				type: 'array',
				items: schemaChecklist
			},
			
		});

		console.log('checklist', checklist);
		return responseSuccess(checklist);
	} catch (error) {
		console.error('Error creating checklist:', error);
		return json({ error: 'Failed to create checklist' }, { status: 500 });
	}
};
