// create-step-2.page.ts
import { goto } from '$app/navigation';
import { route } from '@/lib/ROUTES';
import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
import { validateStep } from '../utils/step-validation';
import { get } from 'svelte/store';
import { onMount } from 'svelte';

export function controller() {
	onMount(() => {
		validateStep(2);
	});

	const store = get(createTestCaseStore);

	const handleNext = () => goto(route('/create-test-case/step-3'));
	const handlePrev = () => goto(route('/create-test-case/step-1'));

	return { store, handleNext, handlePrev };
}
