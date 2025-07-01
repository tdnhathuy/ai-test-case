<script lang="ts">
	import {
		DialogClose,
		DialogContent,
		DialogDescription,
		DialogTitle
	} from '@/lib/components/ui/dialog';
	import DialogHeader from '@/lib/components/ui/dialog/dialog-header.svelte';
	import { cn } from '@/lib/utils';
	import { X } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		class?: string;
		title?: string;
		footer?: Snippet;
		
	};
	const { children, class: className, title, footer }: Props = $props();
</script>

{#snippet defaultHeader(title: string)}
	<DialogHeader class="flex flex-row items-start justify-between gap-10">
		<DialogTitle>{title}</DialogTitle>

		<DialogClose class="cursor-pointer">
			<X />
		</DialogClose>
	</DialogHeader>
{/snippet}

<DialogContent class={cn('flex flex-col gap-4', className)} showCloseButton={false}>
	{@render defaultHeader(title ?? '')}

	{#if children}
		<DialogDescription>
			{@render children()}
		</DialogDescription>
	{/if}

	{@render footer?.()}
</DialogContent>
