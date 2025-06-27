<script lang="ts">
	import { api } from '@/lib/common/services/client';
	import type { Category } from '@/lib/common/types/app.type';
	import ListCategory from '@/modules/category/components/list-category.svelte';
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery({
		queryKey: ['category'],
		queryFn: () => api.get<Category[]>('GET /api/profile/category')
	});

	const categories = $derived($query.data ?? []);
</script>

<div class="flex h-[97vh] w-full gap-4 p-4">
	<ListCategory title="Thu" {categories} />

	<ListCategory title="Chi" {categories} />
</div>
