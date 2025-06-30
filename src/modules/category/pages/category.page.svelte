<script lang="ts">
	import { QueryKeys } from '@/lib/common/constant/key.const';
	import { ServiceCategory } from '@/lib/common/services/category.service';
	import ListCategory from '@/modules/category/components/list-category.svelte';
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery({
		queryKey: [QueryKeys.getCategory],
		queryFn: ServiceCategory.getCategory
	});

	const categories = $derived($query.data ?? []);
</script>

<div class="flex h-[97vh] w-full gap-4 p-4">
	<ListCategory title="Thu" {categories} />
	<ListCategory title="Chi" {categories} />
</div>
