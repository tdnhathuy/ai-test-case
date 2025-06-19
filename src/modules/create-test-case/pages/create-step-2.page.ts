// create-step-2.page.ts
import { goto } from '$app/navigation';
import { route } from '@/lib/ROUTES';
import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
import { validateStep } from '../utils/step-validation';
import { get } from 'svelte/store';
import { onMount } from 'svelte';
import type { ChecklistItem } from '@/lib/types/app.type';

export default function () {
	onMount(() => {
		validateStep(2);
	});

	const store = get(createTestCaseStore);

	const handleNext = () => goto(route('/create-test-case/step-3'));
	const handlePrev = () => goto(route('/create-test-case/step-1'));
	const updateChecklist = (checklist: ChecklistItem[]) => {
		createTestCaseStore.updateStep2({ checklist });
	};

	return {
		store,
		values: {
			checklist: store.step2.checklist
		},
		actions: { handleNext, handlePrev, updateChecklist }
	};
}
