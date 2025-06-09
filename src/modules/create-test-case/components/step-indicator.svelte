<script lang="ts">
	interface Props {
		currentStep: number;
		totalSteps?: number;
	}

	let { currentStep, totalSteps = 3 }: Props = $props();

	const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

	const titles = ['Basic Information', 'Requirements', 'Review'];
</script>

<div class="mx-auto mb-6 flex max-w-lg flex-col gap-4">
	<div class="mb-6 flex items-center justify-center">
		<div class="flex items-center space-x-4">
			{#each steps as step, index}
				<div class="flex items-center">
					<!-- Step circle -->
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors
						{step <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}"
					>
						{step}
					</div>

					<!-- Step label -->
					<span
						class={`ml-2 text-sm ${step <= currentStep ? 'font-medium text-blue-600' : 'text-gray-500'}`}
					>
						{#if step === 1}
							Basic Info
						{:else if step === 2}
							Requirements
						{:else if step === 3}
							Review
						{/if}
					</span>

					<!-- Connector line -->
					{#if index < steps.length - 1}
						<div
							class="mx-4 h-px w-8 transition-colors
							{step < currentStep ? 'bg-blue-500' : 'bg-gray-300'}"
						></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<h1 class="text-2xl font-bold">{`Step ${currentStep}: ${titles[currentStep - 1]}`}</h1>
</div>
