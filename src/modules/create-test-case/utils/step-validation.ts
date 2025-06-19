import { goto } from '$app/navigation';
import { route } from '@/lib/ROUTES';
import { createTestCaseStore, type CreateTestCaseData } from '../stores/create-test-case.store';
import { get } from 'svelte/store';

export const validateStep = (step: number) => {
	const store = get(createTestCaseStore);

	if (step === 2 && !store.step2.checklist.length) {
		return goto(route('/create-test-case/step-1'));
	}

	if (step === 3 && !store.step3.testSteps?.length) {
		return goto(route('/create-test-case/step-2'));
	}

	return true;
};
