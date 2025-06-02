import { json } from '@sveltejs/kit';
import { promptCreateChecklist } from '@/lib/helpers/promp.helper';
import { GoogleGenAI } from '@google/genai';
import type { RequestHandler } from './$types';
import { AI_KEY } from '$env/static/private';

const genAI = new GoogleGenAI({ apiKey: AI_KEY });

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { description } = await request.json();

		if (!description) {
			return json({ error: 'Description is required' }, { status: 400 });
		}

		const contents = promptCreateChecklist(description);

		const response = await genAI.models.generateContent({
			model: 'gemini-2.0-flash-001',
			contents: contents
		});

		const checklist = response.text;

		return json({ checklist });
	} catch (error) {
		console.error('Error creating checklist:', error);
		return json({ error: 'Failed to create checklist' }, { status: 500 });
	}
};
