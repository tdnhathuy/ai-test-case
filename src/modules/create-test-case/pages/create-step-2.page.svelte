<script lang="ts">
	import { goto } from '$app/navigation';
	import { route } from '@/lib/ROUTES';
	import ContainerStep from '@/modules/create-test-case/components/container-step.svelte';
	import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
	import { onMount } from 'svelte';
	import StepIndicator from '../components/step-indicator.svelte';
	import { validateStep } from '../utils/step-validation';
	import { Button } from '@/lib/components/ui/button';

	$: store = $createTestCaseStore;

	onMount(() => {
		const isStepValid = validateStep(2, store);
		if (!isStepValid) {
			goto(route('/create-test-case/step-1'));
		}
	});

	const handleNext = () => {
		goto(route('/create-test-case/step-3'));
	};
</script>

<StepIndicator currentStep={2} />
<ContainerStep>
	<span>{store.step1.description}</span>
	<!-- <Textarea bind:value={description} placeholder="Enter description" class="h-48" /> -->

	<Button onclick={handleNext} class="w-fit self-end">Next</Button>
</ContainerStep>
