<script lang="ts">
	import { useGetListTrans } from '@/lib/common/services';
	import ListTransItem from './list-trans.item.svelte';
	import { ScrollArea } from '@/lib/components/ui/scroll-area';
	const queryTransaction = useGetListTrans();
</script>

<ScrollArea class="h-full" orientation="vertical">
	{#if $queryTransaction.isSuccess}
		<div class="flex flex-col gap-2 px-2 pr-10">
			{#each $queryTransaction.data as transaction}
				<ListTransItem {transaction} />
			{/each}
		</div>
	{/if}
</ScrollArea>
