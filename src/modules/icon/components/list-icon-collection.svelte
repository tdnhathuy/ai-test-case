<script lang="ts">
	import { useGetListIconCollection } from '@/lib/common/services';

	const queryIconCollection = useGetListIconCollection();

	const iconCollections = $derived($queryIconCollection.data ?? []);
</script>

<div>
	{#each iconCollections as iconCollection}
		<div>{iconCollection.name}</div>
	{/each}
</div>
