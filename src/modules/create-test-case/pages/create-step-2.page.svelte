<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Accordion from '@/lib/components/ui/accordion';
	import { Button } from '@/lib/components/ui/button';
	import { route } from '@/lib/ROUTES';
	import ContainerStep from '@/modules/create-test-case/components/container-step.svelte';
	import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
	import { onMount } from 'svelte';
	import StepIndicator from '../components/step-indicator.svelte';
	import { validateStep } from '../utils/step-validation';
	import ButtonStep from '@/modules/create-test-case/components/button-step.svelte';
	$: store = $createTestCaseStore;

	$: checklist = $createTestCaseStore.step2.checklist.original || [];

	onMount(() => {
		const isStepValid = validateStep(2, store);
		if (!isStepValid) {
			goto(route('/create-test-case/step-1'));
		}
	});

	const handleNext = () => {
		goto(route('/create-test-case/step-3'));
	};

	const handlePrev = () => {
		goto(route('/create-test-case/step-1'));
	};
</script>

<ContainerStep>
	<StepIndicator currentStep={2}>
		{#snippet renderBtnNext()}
			<ButtonStep title="Next" onClick={handleNext} />
		{/snippet}

		{#snippet renderBtnPrev()}
			<ButtonStep title="Previous" onClick={handlePrev} />
		{/snippet}
	</StepIndicator>

	<Accordion.Root type="multiple">
		<ul>
			{#each checklist as checklist}
				<li value={checklist.id}>
					<Accordion.Item value={checklist.id}>
						<Accordion.Trigger>
							<span>{checklist.description}</span>
						</Accordion.Trigger>

						<Accordion.Content>
							<ul class="ml-12 flex flex-col">
								{#each checklist.items as item}
									<li id={item.id}>
										<span>{item.name}</span>
										<span>{item.description}</span>
									</li>
								{/each}
							</ul>
						</Accordion.Content>
					</Accordion.Item>
				</li>
			{/each}
		</ul>
	</Accordion.Root>
</ContainerStep>
