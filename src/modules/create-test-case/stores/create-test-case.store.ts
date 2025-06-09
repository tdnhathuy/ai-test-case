import { writable } from 'svelte/store';

export interface CreateTestCaseData {
	step1: {
		description?: string;
		images?: string[];
	};
	step2: {
		requirements?: string[];
		priority?: 'low' | 'medium' | 'high';
	};
	step3: {
		testSteps?: Array<{
			action: string;
			expected: string;
		}>;
	};
}

const defaultData: CreateTestCaseData = {
	step1: { description: '', images: [] },
	step2: { requirements: [], priority: 'medium' },
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
