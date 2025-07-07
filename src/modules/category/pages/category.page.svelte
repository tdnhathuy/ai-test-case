<script lang="ts">
	import { useGetListCategory, useGetListIcon } from '@/lib/common/services/mutations/app.query';
	import ButtonCreateCategory from '@/modules/category/components/button-create-category.svelte';
	import ListCategory from '@/modules/category/components/list-category.svelte';

	const query = useGetListCategory();
	useGetListIcon();

	const income = $derived($query.data?.filter((x) => x.type === 'Income') ?? []);
	const expense = $derived($query.data?.filter((x) => x.type === 'Expense') ?? []);
</script>

{#if $query.isLoading}
	<div class="flex h-full flex-1 justify-center">
		<span>Loading...</span>
	</div>
{:else}
	<section class="flex h-full w-full flex-col gap-4">
		<div class="mx-auto h-full w-2xl bg-red-300">
			<ButtonCreateCategory />
			<div class="flex h-full flex-1 gap-4">
				<ListCategory title="Thu" categories={income} />
				<ListCategory title="Chi" categories={expense} />
			</div>
		</div>
	</section>
{/if}
