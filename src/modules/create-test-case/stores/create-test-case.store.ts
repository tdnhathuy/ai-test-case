import type { ChecklistItem } from '@/lib/types/app.type';
import { writable } from 'svelte/store';

export interface Step1Data {
	userStory: string;
	acceptanceCriteria: string;
	images?: string[];
}

export interface CreateTestCaseData {
	step1: Step1Data;
	step2: {
		checklist: ChecklistItem[];
	};
	step3: {
		testSteps?: Array<{
			action: string;
			expected: string;
		}>;
	};
}

const defaultData: CreateTestCaseData = {
	step1: { userStory: '', acceptanceCriteria: '', images: [] },
	step2: { checklist: [] },
	step3: { testSteps: [] }
};

function createTestCaseStoreFactory() {
	const methods = writable<CreateTestCaseData>(defaultData);

	return {
		...methods,
		reset: () => methods.set(defaultData),
		toggleChecklistItem: (id: string) =>
			methods.update((state) => {
				const checklist = state.step2.checklist.map((c) =>
					c.id === id ? { ...c, checked: !c.checked } : c
				);
				return { ...state, step2: { ...state.step2, checklist } };
			}),

		updateStep1: (data: CreateTestCaseData['step1']) =>
			methods.update((store) => ({ ...store, step1: { ...store.step1, ...data } })),
		updateStep2: (data: CreateTestCaseData['step2']) =>
			methods.update((store) => ({ ...store, step2: { ...store.step2, ...data } })),
		updateStep3: (data: CreateTestCaseData['step3']) =>
			methods.update((store) => ({ ...store, step3: { ...store.step3, ...data } }))
	};
}

export const createTestCaseStore = createTestCaseStoreFactory();
