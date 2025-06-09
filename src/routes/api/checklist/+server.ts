import { AIModel } from '@/lib/helpers/ai-model.helper';
import { buildChecklistPrompt } from '@/lib/helpers/promp.helper';
import type { Checklist } from '@/lib/types/app.type';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { description } = body;

		if (!description) {
			return json({ error: 'Description is required' }, { status: 400 });
		}

		const prompt = buildChecklistPrompt({
			userStories: '',
			projectDescription: description,
			images: []
		});

		const checklist = await AIModel.getInstance().prompting<Checklist[]>(prompt);

		const response = json({ checklist });
		console.log('response', response);
		return response;
	} catch (error) {
		console.error('Error creating checklist:', error);
		return json({ error: 'Failed to create checklist' }, { status: 500 });
	}
};
