<script lang="ts">
	import { cn } from '@/lib/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		label?: string;
		children: Snippet;
		class?: string;
		vertical?: boolean;
	};

	let { label, children, class: className, vertical }: Props = $props();
</script>

<section
	class={cn(
		'flex flex-col gap-2',
		vertical && 'flex-row items-center justify-between ',
		//
		className
	)}
>
	{#if label}
		<h1>{label}</h1>
	{/if}

	{@render children()}
</section>
