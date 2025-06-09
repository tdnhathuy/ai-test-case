<script lang="ts">
	import type { Checklist } from '@/lib/types/app.type';

	export let checklist: Checklist[];
</script>

<section>
	<span>1</span>
	{#each checklist as item}
		{@render checklistItem(item)}
	{/each}
</section>

{#snippet checklistItem(item: Checklist)}
	<div class="flex items-center gap-2">
		<span class="text-sm font-medium">{item.name}</span>
		<span class="text-sm">{item.description}</span>
	</div>
{/snippet}
