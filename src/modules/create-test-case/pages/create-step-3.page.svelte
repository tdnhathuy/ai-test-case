<script lang="ts">
	import { goto } from '$app/navigation';
	import { route } from '@/lib/ROUTES';
	import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
	import { onMount } from 'svelte';
	import StepIndicator from '../components/step-indicator.svelte';
	import { validateStep } from '../utils/step-validation';
	import ContainerStep from '@/modules/create-test-case/components/container-step.svelte';
	import { Button } from '@/lib/components/ui/button';

	$: store = $createTestCaseStore;

	onMount(() => {
		const requiredStep = validateStep(3, store);
		if (requiredStep) {
			console.log(`Missing data, redirecting to ${requiredStep}`);
			goto(route('/create-test-case/step-1'));
		}
	});

	function handleSubmit() {
		goto('/');
	}
</script>

<StepIndicator currentStep={3} />
<ContainerStep>
	<span>3</span>
	<!-- <Textarea bind:value={description} placeholder="Enter description" class="h-48" /> -->

	<Button onclick={handleSubmit} class="w-fit self-end">Next</Button>
</ContainerStep>
