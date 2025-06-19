<script lang="ts">
	import { cn } from '@/lib/utils';
	import type { Snippet } from 'svelte';

	let {
		label,
		children,
		class: className
	}: { label: string; children: Snippet; class?: string } = $props();
</script>

<section class={cn('flex flex-col gap-2', className)}>
	<h1>{label}</h1>
	{@render children()}
</section>
