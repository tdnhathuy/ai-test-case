<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '@/lib/utils';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className, children }: Props = $props();
</script>

<section class={cn('h-full w-full bg-gradient-to-b from-blue-500 to-purple-500', className)}>
	{@render children?.()}
</section>
