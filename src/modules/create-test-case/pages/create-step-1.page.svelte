<script lang="ts">
	import { goto } from '$app/navigation';
	import ButtonBase from '@/lib/components/svelte/button/button-base.svelte';
	import Stack from '@/lib/components/svelte/stack.svelte';
	import { Textarea } from '@/lib/components/ui/textarea';
	import { route } from '@/lib/ROUTES';
	import { createChecklist } from '@/lib/services/api.service';
	import ButtonStep from '@/modules/create-test-case/components/button-step.svelte';
	import ContainerStep from '@/modules/create-test-case/components/container-step.svelte';
	import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
	import { User } from '@lucide/svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import StepIndicator from '../components/step-indicator.svelte';

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

<ContainerStep>
	<StepIndicator currentStep={1}>
		{#snippet renderBtnNext()}
			<ButtonStep title="Next" onClick={handleNext} isLoading={$mutation.isPending} />
		{/snippet}
	</StepIndicator>

	<Textarea bind:value={description} placeholder="Enter description" class="h-48 resize-none" />
</ContainerStep>
