<script lang="ts">
	import type { Category } from '@/lib/common/types/app.type';
	import Stack from '@/lib/components/wise/stack.svelte';
	import {
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle
	} from '@/lib/components/ui/dialog';
	import { WiseIconSelector } from '@/lib/components/wise';
	import WiseInput from '@/lib/components/wise/input/wise-input.svelte';
	import CategoryParentSelection from '@/modules/category/components/category-dialog/category-parent-selection.svelte';
	import CategoryFooterDialog from './category.footer.dialog.svelte';
	import CategoryRadio from './category.radio.svelte';
	interface Props {
		category: Category;
		isCreate?: boolean;
	}

	let { category: initialCategory, isCreate = false }: Props = $props();

	let category = $state({ ...initialCategory });

	const dialogTitle = $derived(isCreate ? 'Thêm danh mục' : 'Cập nhật danh mục');

	const showCategoryRadio = $derived(!category.idParent);
	const showParentSelection = $derived(!isCreate);
</script>

<DialogContent class="w-sm">
	<DialogHeader>
		<DialogTitle>{dialogTitle}</DialogTitle>
	</DialogHeader>

	<DialogDescription>
		<Stack vertical class="gap-4">
			<Stack class="items-center gap-2">
				<WiseIconSelector bind:icon={category.icon} />
				<WiseInput type="text" placeholder="Tên danh mục" bind:value={category.name} />
			</Stack>

			{#if showCategoryRadio}
				<CategoryRadio bind:category />
			{/if}

			{#if showParentSelection}
				<CategoryParentSelection bind:category />
			{/if}
		</Stack>
	</DialogDescription>

	<CategoryFooterDialog {category} {isCreate} />
</DialogContent>
