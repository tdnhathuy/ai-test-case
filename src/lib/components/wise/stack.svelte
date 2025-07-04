<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		class?: string;
		vertical?: boolean;
	};

	let { children, class: className = '', vertical = false }: Props = $props();
</script>

<div class={cn('flex flex-col gap-2', vertical && 'flex-row', className)}>
	{@render children?.()}
</div>
