<script lang="ts">
	import Button from '@/lib/components/ui/button/button.svelte';
	import { Textarea } from '@/lib/components/ui/textarea';
	import { createChecklist } from '@/lib/services/api.service';
	import ContainerStep from '@/modules/create-test-case/components/container-step.svelte';
	import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
	import { createMutation } from '@tanstack/svelte-query';
	import StepIndicator from '../components/step-indicator.svelte';
	import { route } from '@/lib/ROUTES';
	import { goto } from '$app/navigation';

	$: description = $createTestCaseStore.step1.description || '';

	const mutation = createMutation({
		mutationKey: ['create-checklist'],
		mutationFn: createChecklist
	});

	async function handleNext() {
		const response = await $mutation.mutateAsync({ description });

		const checklist = {
			original: response,
			selected: []
		};
		createTestCaseStore.updateStep1({ description });
		createTestCaseStore.updateStep2({ checklist });
		goto(route('/create-test-case/step-2'));
	}
</script>

<StepIndicator currentStep={1} />
<ContainerStep>
	<Textarea bind:value={description} placeholder="Enter description" class="h-48" />

	<Button
		onclick={handleNext}
		disabled={!description || $mutation.isPending}
		class="w-fit self-end"
	>
		{$mutation.isPending ? 'Creating...' : 'Next'}
	</Button>
</ContainerStep>
