<script lang="ts">
	import ButtonStep from '@/modules/create-test-case/components/button-step.svelte';
	import ContainerStep from '@/modules/create-test-case/components/container-step.svelte';
	import StepIndicator from '../components/step-indicator.svelte';
	import { controller } from './create-step-2.page';

	const { store, handleNext, handlePrev } = controller();
</script>

<ContainerStep>
	<StepIndicator currentStep={2}>
		{#snippet renderBtnNext()}
			<ButtonStep title="Next" onClick={handleNext} disabled={store.step2.checklist.length === 0} />
		{/snippet}

		{#snippet renderBtnPrev()}
			<ButtonStep title="Previous" onClick={handlePrev} />
		{/snippet}
	</StepIndicator>
</ContainerStep>
