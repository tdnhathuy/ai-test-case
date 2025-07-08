<script lang="ts">
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
	import { WrapperSelector } from '@/modules/transaction/components/selection';

	type Props = {
		transaction?: Transaction;
	};
	let { transaction = $bindable() }: Props = $props();

	const queryCategory = useGetListCategory();

	const listCategory = $derived($queryCategory.data ?? []);

	const listCategoryIncome = $derived(getListIncome(listCategory));
	const listCategoryExpense = $derived(getListExpense(listCategory));

	const icon = $derived(transaction?.category?.icon ?? null);
	const title = $derived(transaction?.category?.name ?? 'Chưa phân loại');

	const onSelectCategory = (category: Category) => {
		console.log('category', category);
		console.log('transaction', transaction);
		if (transaction) {
			transaction.category = category;
		}
	};
</script>

<Popover>
	<PopoverTrigger>
		<WrapperSelector {icon} {title} />
	</PopoverTrigger>

	<PopoverContent class=" flex h-fit w-fit gap-2 p-2  pr-1">
		{@render renderListCategory(listCategoryIncome)}
		{@render renderListCategory(listCategoryExpense)}
	</PopoverContent>
</Popover>

{#snippet renderListCategory(listCategory: Category[])}
	<ScrollArea class="flex h-96  w-72 flex-1 flex-col pr-4" orientation="vertical">
		<ul class="flex flex-col gap-1">
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
	<WiseButton variant="ghost" class="w-full justify-start">
		<WiseIcon icon={category.icon} size="sm" />
		<span>{category.name}</span>
	</WiseButton>
{/snippet}
