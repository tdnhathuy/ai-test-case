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
	const { subscribe, set, update } = writable<CreateTestCaseData>(defaultData);

	return {
		subscribe,
		// Reset store
		reset: () => set(defaultData),
		// Update step 1 data
		updateStep1: (data: CreateTestCaseData['step1']) =>
			update((store) => ({ ...store, step1: { ...store.step1, ...data } })),
		// Update step 2 data
		updateStep2: (data: CreateTestCaseData['step2']) =>
			update((store) => ({ ...store, step2: { ...store.step2, ...data } })),
		// Update step 3 data
		updateStep3: (data: CreateTestCaseData['step3']) =>
			update((store) => ({ ...store, step3: { ...store.step3, ...data } })),
		// Get all data
		set,
		update
	};
}

export const createTestCaseStore = createTestCaseStoreFactory();
