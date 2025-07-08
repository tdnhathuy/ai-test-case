<script lang="ts">
	import type { ICategoryType } from '@/lib/common/enum/collection.enum';
	import { getListExpense, getListIncome } from '@/lib/common/helpers';
	import { useGetListCategory } from '@/lib/common/services';
	import type { Category, Transaction } from '@/lib/common/types';
	import {
		Popover,
		PopoverClose,
		PopoverContent,
		PopoverTrigger
	} from '@/lib/components/ui/popover';
	import { ScrollArea } from '@/lib/components/ui/scroll-area';
	import { WiseButton, WiseIcon } from '@/lib/components/wise';
	import Stack from '@/lib/components/wise/stack.svelte';
	import { WrapperSelector } from '@/modules/transaction/components/selection';

	type Props = {
		transaction?: Transaction;
	};
	let { transaction = $bindable() }: Props = $props();

	let viewType = $state<ICategoryType>('Expense');

	const queryCategory = useGetListCategory();

	// Derived values cho categories
	const listCategory = $derived($queryCategory.data ?? []);
	const listCategoryIncome = $derived(getListIncome(listCategory));
	const listCategoryExpense = $derived(getListExpense(listCategory));
	const currentCategoryList = $derived(
		viewType === 'Income' ? listCategoryIncome : listCategoryExpense
	);

	// Derived values cho UI state
	const isExpense = $derived(viewType === 'Expense');
	const isIncome = $derived(viewType === 'Income');

	// Derived values cho transaction
	const selectedCategory = $derived(transaction?.category);
	const icon = $derived(selectedCategory?.icon ?? null);
	const title = $derived(selectedCategory?.name ?? 'Chưa phân loại');

	const onSelectCategory = (category: Category) => {
		if (transaction) {
			transaction.category = category;
		}
	};

	const switchToExpense = () => (viewType = 'Expense');
	const switchToIncome = () => (viewType = 'Income');
</script>

<Popover>
	<PopoverTrigger>
		<WrapperSelector {icon} {title} />
	</PopoverTrigger>

	<PopoverContent class="p-1">
		<Stack class="flex h-fit flex-col gap-2">
			<Stack vertical class="mx-auto">
				<WiseButton size="sm" variant={isExpense ? 'default' : 'ghost'} onclick={switchToExpense}>
					<span>Chi</span>
				</WiseButton>
				<WiseButton size="sm" variant={isIncome ? 'default' : 'ghost'} onclick={switchToIncome}>
					<span>Thu</span>
				</WiseButton>
			</Stack>

			{@render renderListCategory(currentCategoryList)}
		</Stack>
	</PopoverContent>
</Popover>

{#snippet renderListCategory(listCategory: Category[])}
	<ScrollArea class="flex h-fit  flex-1 flex-col" orientation="vertical">
		<ul class="flex h-72 w-72 flex-col gap-1 pr-8">
			{#each listCategory as category}
				<PopoverClose onclick={() => onSelectCategory(category)}>
					{@render renderCategory(category)}
				</PopoverClose>

				{#if category.children?.length}
					{#each category.children as child}
						<PopoverClose onclick={() => onSelectCategory(child)} class="ml-6">
							{@render renderCategory(child)}
						</PopoverClose>
					{/each}
				{/if}
			{/each}
		</ul>
	</ScrollArea>
{/snippet}

{#snippet renderCategory(category: Category)}
	<WiseButton size="sm" variant="ghost" class="w-full justify-start">
		<WiseIcon icon={category.icon} size="sm" />
		<span>{category.name}</span>
	</WiseButton>
{/snippet}
