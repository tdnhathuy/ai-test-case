<script lang="ts">
	import { goto } from '$app/navigation';
	import InputArea from '@/lib/components/svelte/input/input-area.svelte';
	import { route } from '@/lib/ROUTES';
	import { createChecklist } from '@/lib/services/api.service';
	import ButtonStep from '@/modules/create-test-case/components/button-step.svelte';
	import ContainerStep from '@/modules/create-test-case/components/container-step.svelte';
	import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
	import { createMutation } from '@tanstack/svelte-query';
	import StepIndicator from '../components/step-indicator.svelte';
	import LabelSection from '@/lib/components/svelte/label-section.svelte';
	import ButtonSuggest from '@/modules/create-test-case/components/button-suggest.svelte';

	$: userStory = $createTestCaseStore.step1.userStory || '';
	$: acceptanceCriteria = $createTestCaseStore.step1.acceptanceCriteria || '';
	$: checklist = $createTestCaseStore.step2.checklist || '';

	const mutation = createMutation({
		mutationKey: ['create-checklist'],
		mutationFn: createChecklist
	});

	async function handleNext() {
		if (!checklist.length) {
			const params = { userStory, acceptanceCriteria };
			const checklist = await $mutation.mutateAsync(params);
			createTestCaseStore.updateStep2({ checklist });
		}

		goto(route('/create-test-case/step-2'));
	}
</script>

<ContainerStep>
	<StepIndicator currentStep={1}>
		{#snippet renderBtnNext()}
			<ButtonStep
				title="Next"
				onClick={handleNext}
				disabled={!userStory || !acceptanceCriteria}
				isLoading={$mutation.isPending}
			/>
		{/snippet}
	</StepIndicator>

	<LabelSection label="User story">
		<InputArea bind:value={userStory} placeholder="Enter description" class="h-14" />
	</LabelSection>

	<LabelSection label="Acceptance criteria">
		<InputArea bind:value={acceptanceCriteria} placeholder="Enter description" class="h-48" />
	</LabelSection>

	<ButtonSuggest />
</ContainerStep>
