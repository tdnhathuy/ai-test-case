<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '@/lib/utils';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className, children }: Props = $props();
</script>

<main
	class={cn(
		'flex h-screen w-screen overflow-hidden bg-gradient-to-tr from-blue-500 to-purple-500',
		className
	)}
>
	{@render children?.()}
</main>
