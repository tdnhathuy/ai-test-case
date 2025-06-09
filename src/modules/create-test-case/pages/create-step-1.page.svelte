<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '@/lib/components/ui/button/button.svelte';
	import { Textarea } from '@/lib/components/ui/textarea';
	import { route } from '@/lib/ROUTES';
	import ContainerStep from '@/modules/create-test-case/components/container-step.svelte';
	import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
	import StepIndicator from '../components/step-indicator.svelte';

	$: description = $createTestCaseStore.step1.description || '';

	function handleNext() {
		createTestCaseStore.updateStep1({ description });

		goto(route('/create-test-case/step-2'));
	}
</script>

<StepIndicator currentStep={1} />
<ContainerStep>
	<Textarea bind:value={description} placeholder="Enter description" class="h-48" />

	<Button onclick={handleNext} disabled={!description} class="w-fit self-end">Next</Button>
</ContainerStep>
