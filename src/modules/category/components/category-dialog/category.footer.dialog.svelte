<script lang="ts">
	import type { Category } from '@/lib/common/types';
	import { DialogClose, DialogFooter } from '@/lib/components/ui/dialog';
	import { WiseButton } from '@/lib/components/wise';
	import { ButtonCreateCategory, ButtonDeleteCategory, ButtonUpdateCategory } from './button';

	type Props = {
		category: Category;
		isCreate: boolean;
	};

	let refClose: HTMLButtonElement | null = $state(null);

	let { category = $bindable(), isCreate = $bindable() }: Props = $props();
</script>

<DialogFooter class="flex">
	{#if !isCreate}
		<ButtonDeleteCategory {category} {refClose} />
	{/if}

	<span class="flex-1"></span>

	<WiseButton variant="outline" onclick={() => refClose?.click()}>Huỷ</WiseButton>

	{#if isCreate}
		<ButtonCreateCategory {category} {refClose} />
	{:else}
		<ButtonUpdateCategory {category} {refClose} />
	{/if}
</DialogFooter>

<DialogClose bind:ref={refClose} />
