import { AIModel } from '@/lib/helpers/ai-model.helper';
import { buildChecklistPrompt } from '@/lib/helpers/promp.helper';
import type { Checklist } from '@/lib/types/app.type';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { description } = await request.json();

		if (!description) {
			return json({ error: 'Description is required' }, { status: 400 });
		}

		const prompt = buildChecklistPrompt({
			userStories: '',
			projectDescription: description,
			images: []
		});

		const checklist = await AIModel.getInstance().prompting<Checklist[]>(prompt);

		return json({ checklist });
	} catch (error) {
		console.error('Error creating checklist:', error);
		return json({ error: 'Failed to create checklist' }, { status: 500 });
	}
};
