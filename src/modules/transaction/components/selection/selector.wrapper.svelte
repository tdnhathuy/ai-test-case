<script lang="ts">
	import type { Icon } from '@/lib/common/types';
	import { WiseIcon } from '@/lib/components/wise';
	import Stack from '@/lib/components/wise/stack.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		class?: string;
		icon?: Icon | null | undefined;
		title?: string | null;
	};

	let { children, class: className, icon, title }: Props = $props();
</script>

<Stack class="flex h-full w-full  items-center gap-3   rounded-md border p-2" vertical>
	{#if children}
		{@render children?.()}
	{:else}
		<span>
			<WiseIcon {icon} size="sm" />
		</span>
		<span>{title}</span>
	{/if}
</Stack>
