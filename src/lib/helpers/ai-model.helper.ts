import { AI_KEY } from '$env/static/private';
import { parseAIResponse } from '@/lib/helpers/promp.helper';
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: AI_KEY });

export class AIModel {
	private static instance: AIModel;
	private model: string;

	private constructor(model: string = 'gemini-1.5-flash') {
		this.model = model;
	}

	static getInstance(model?: string): AIModel {
		if (!AIModel.instance) {
			AIModel.instance = new AIModel(model);
		}
		return AIModel.instance;
	}

	setModel(model: string): void {
		this.model = model;
	}

	getModel(): string {
		return this.model;
	}

	async prompting<T>(prompt: string): Promise<T> {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await genAI.models.generateContent({
					model: this.model,
					contents: prompt
				});
				resolve(parseAIResponse(response.text || '') as T);
			} catch (error) {
				reject(error);
			}
		});
	}
}
