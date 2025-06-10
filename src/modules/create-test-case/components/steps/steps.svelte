<script lang="ts">
	import { cn } from '@/lib/utils';
	import { configSteps } from '@/modules/create-test-case/components/steps/config';

	interface Props {
		currentStep: number;
	}

	let { currentStep }: Props = $props();
</script>

<span class="flex w-full justify-between text-sm text-gray-500">
	{#each configSteps as step}
		{@const Icon = step.icon}
		{@const isActive = step.step === currentStep}
		<span class={cn('flex flex-1 flex-col items-center gap-2 py-2', isActive && 'text-blue-500')}>
			<Icon class="size-6" />
			<span>{step.title}</span>
		</span>
	{/each}
</span>
