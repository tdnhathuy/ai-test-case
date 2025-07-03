<script lang="ts">
	import { useGetListTrans } from '@/lib/common/services';
	import { ScrollArea } from '@/lib/components/ui/scroll-area';
	import groupBy from 'lodash/groupBy';
	import orderBy from 'lodash/orderBy';
	import ListTransItem from './list-trans.item.svelte';
	import { formatDate } from '@/lib/common/helpers';
	const queryTransaction = useGetListTrans();

	const listTrans = $derived($queryTransaction.data ?? []);

	const groupedTrans = $derived(() => {
		const sorted = orderBy(listTrans, (x) => new Date(x.date), ['desc']);
		const grouped = groupBy(sorted, (x) => formatDate(x.date));
		return Object.entries(grouped);
	});
</script>

<ScrollArea class="h-full" orientation="vertical">
	{#if $queryTransaction.isSuccess}
		<div class="flex flex-col gap-2 px-2 pr-4 pb-20">
			{#each groupedTrans() as [title, transactions]}
				<p>{title}</p>
				{#each transactions as transaction}
					<ListTransItem {transaction} />
				{/each}
			{/each}
			<!-- {#each listTrans as transaction}
				<ListTransItem {transaction} />
			{/each} -->
		</div>
	{/if}
</ScrollArea>
