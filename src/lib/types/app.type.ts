export interface PromptCreate {
	description: string;
}

export type ChecklistItem = {
	id: string;
	name: string;
	description: string;
};

export type Checklist = {
	id: string;
	name: string;
	description: string;
	items: ChecklistItem[];
};
