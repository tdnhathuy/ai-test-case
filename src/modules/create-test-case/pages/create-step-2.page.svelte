<script lang="ts">
	import ButtonStep from '@/modules/create-test-case/components/button-step.svelte';
	import ContainerStep from '@/modules/create-test-case/components/container-step.svelte';
	import StepIndicator from '../components/step-indicator.svelte';

	import CheckList from '@/modules/create-test-case/components/check-list.svelte';
	import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
	import controller from './create-step-2.page';

	const { actions } = controller();
	const { handleNext, handlePrev } = actions;

	$: isDisabled = $createTestCaseStore.step2.checklist.every((x) => !x.checked);
</script>

<ContainerStep>
	<StepIndicator currentStep={2}>
		{#snippet renderBtnNext()}
			<ButtonStep title="Next" onClick={handleNext} disabled={isDisabled} />
		{/snippet}

		{#snippet renderBtnPrev()}
			<ButtonStep title="Previous" onClick={handlePrev} />
		{/snippet}
	</StepIndicator>

	<CheckList />
</ContainerStep>
