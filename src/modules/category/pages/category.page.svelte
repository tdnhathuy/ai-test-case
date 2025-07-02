<script lang="ts">
	import { useGetListCategory } from '@/lib/common/services/mutations/app.query';
	import ListCategory from '@/modules/category/components/list-category.svelte';

	const query = useGetListCategory();
</script>

{#if $query.isLoading}
	<span>Loading...</span>
{:else}
	<div class="flex h-[97vh] w-full gap-4 p-4">
		<ListCategory title="Thu" categories={$query.data?.filter((x) => x.type === 'Income') ?? []} />
		<ListCategory title="Chi" categories={$query.data?.filter((x) => x.type === 'Expense') ?? []} />
	</div>
{/if}
