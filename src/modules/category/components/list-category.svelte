<script lang="ts">
	import type { Category, ChildCategory } from '@/lib/common/types/app.type';
	import Icon from '@/lib/components/svelte/icon.svelte';
	import ScrollArea from '@/lib/components/ui/scroll-area/scroll-area.svelte';
	import { cn } from '@/lib/utils';

	let { categories, title }: { categories: Category[]; title: string } = $props();
</script>

{#snippet categoryItem(category: Category | ChildCategory, isChild: boolean = false)}
	{@const iconSize = isChild ? 'md' : 'lg'}

	<span
		class={cn(
			'flex cursor-pointer items-center gap-4 p-2 px-4 transition-all',
			'hover:bg-accent hover:rounded-md'
		)}
	>
		<Icon url={category.icon} size={iconSize} />
		<span class="text-md font-semibold">{category.name}</span>
	</span>
{/snippet}

<div class="flex flex-1 flex-col gap-2 p-4">
	<h2 class="text-2xl font-bold">{title}</h2>

	<ScrollArea class="h-full " orientation="vertical">
		<ul class=" flex flex-1 flex-col gap-2">
			{#each categories as category}
				<li class="flex items-start gap-2 px-4 py-2 pb-4">
					<span class="flex flex-1 flex-col gap-2">
						{@render categoryItem(category, false)}

						<span class="ml-20 flex flex-col gap-2 divide-y">
							{#each category.children as child}
								{@render categoryItem(child, true)}
							{/each}
						</span>
					</span>
				</li>
			{/each}
		</ul>
	</ScrollArea>
</div>
