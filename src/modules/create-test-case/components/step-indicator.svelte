<script lang="ts">
	import { cn } from '@/lib/utils';
	import Steps from '@/modules/create-test-case/components/steps/steps.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		currentStep: number;
		renderBtnNext?: Snippet;
		renderBtnPrev?: Snippet;
	}

	let { currentStep, renderBtnNext, renderBtnPrev }: Props = $props();

	const isBoth = renderBtnPrev && renderBtnNext;
	const classTW = isBoth ? 'justify-between' : renderBtnNext ? 'justify-end' : 'justify-start';

	const titles = ['Basic Information', 'Requirements', 'Review'];
</script>

<div class="mx-auto mb-6 flex w-full flex-col gap-4">
	<Steps {currentStep} />

	<h1 class="text-2xl font-bold">{`Step ${currentStep}: ${titles[currentStep - 1]}`}</h1>

	<div class={cn('flex', classTW)}>
		{#if renderBtnPrev}
			{@render renderBtnPrev()}
		{/if}

		{#if renderBtnNext}
			{@render renderBtnNext()}
		{/if}
	</div>
</div>
