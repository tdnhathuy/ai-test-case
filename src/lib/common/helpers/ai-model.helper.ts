import { PUBLIC_AI_KEY } from '$env/static/public';
import {
	GoogleGenAI,
	type GenerateContentConfig,
	type GenerateContentParameters
} from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: PUBLIC_AI_KEY });

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

	async prompting<T>(contents: string, config?: GenerateContentConfig): Promise<T> {
		return new Promise(async (resolve, reject) => {
			try {
				const model = this.getModel();
				const params: GenerateContentParameters = {
					model,
					contents: [{ role: 'user', parts: [{ text: contents }] }],
					config
				};
				const response = await genAI.models.generateContent(params);
				resolve(JSON.parse(response.text || '[]') as T);
			} catch (error) {
				reject(error);
			}
		});
	}
}
