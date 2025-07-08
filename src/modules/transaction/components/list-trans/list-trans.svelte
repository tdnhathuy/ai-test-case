<script lang="ts">
	import { formatDate } from '@/lib/common/helpers';
	import { useGetListTrans } from '@/lib/common/services';
	import type { Transaction } from '@/lib/common/types';
	import { ScrollArea } from '@/lib/components/ui/scroll-area';
	import { storeDialogTransaction } from '@/lib/store/dialog.store';
	import { DialogTransaction } from '@/modules/transaction/components/dialog';
	import groupBy from 'lodash/groupBy';
	import orderBy from 'lodash/orderBy';
	import ListTransItem from './list-trans.item.svelte';
	const queryTransaction = useGetListTrans();

	const listTrans = $derived($queryTransaction.data ?? []);

	const groupedTrans = $derived(() => {
		const sorted = orderBy(listTrans, (x) => new Date(x.date), ['desc']);
		const grouped = groupBy(sorted, (x) => formatDate(x.date));
		return Object.entries(grouped);
	});

	const openDialog = (transaction: Transaction) => {
		$storeDialogTransaction.transaction = transaction;
		$storeDialogTransaction.open = true;
	};
</script>

<ScrollArea class="h-full" orientation="vertical">
	{#if $queryTransaction.isSuccess}
		<div class="flex flex-col gap-2 px-2 pr-4 pb-20">
			{#each groupedTrans() as [title, transactions]}
				<p>{title}</p>
				{#each transactions as transaction}
					<button onclick={() => openDialog(transaction)}>
						<ListTransItem {transaction} />
					</button>
				{/each}
			{/each}
		</div>
	{/if}

	<DialogTransaction />
</ScrollArea>
