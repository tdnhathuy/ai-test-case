<script lang="ts">
	import { useGetListCategory } from '@/lib/common/services/mutations/app.query';
	import ListCategory from '@/modules/category/components/list-category.svelte';

	const query = useGetListCategory();

	const categories = $derived($query.data ?? []);
	console.log('categories', categories)
</script>

<div class="flex h-[97vh] w-full gap-4 p-4">
	<ListCategory title="Thu" {categories} />
	<ListCategory title="Chi" {categories} />
</div>
