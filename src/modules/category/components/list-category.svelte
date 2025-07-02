<script lang="ts">
	import type { Category } from '@/lib/common/types/app.type';
	import { Dialog, DialogTrigger } from '@/lib/components/ui/dialog';
	import ScrollArea from '@/lib/components/ui/scroll-area/scroll-area.svelte';
	import { cn } from '@/lib/utils';
	import CategoryDialog from './category-dialog/category.dialog.svelte';
	import WiseIcon from '@/lib/components/wise/wise-icon.svelte';

	let { categories = [], title }: { categories?: Category[]; title: string } = $props();
</script>

<div class="flex h-full w-full flex-col gap-2">
	<h2 class="text-2xl font-bold">{title}</h2>

	<ScrollArea class="flex-1 overflow-hidden" orientation="vertical">
		<ul class="flex flex-col gap-2">
			{#each categories as category (category.id)}
				<li class="flex items-start gap-2 px-4 py-2 pb-4">
					<span class="flex flex-1 flex-col gap-2">
						{@render categoryItem(category, false)}

						<span class="ml-20 flex flex-col gap-2 divide-y">
							{#each category.children || [] as child (child.id)}
								{@render categoryItem(child, true)}
							{/each}
						</span>
					</span>
				</li>
			{/each}
		</ul>
	</ScrollArea>
</div>

{#snippet categoryItem(category: Category, isChild: boolean = false)}
	{@const iconSize = isChild ? 'md' : 'lg'}

	<Dialog>
		<DialogTrigger>
			<span
				class={cn(
					'flex cursor-pointer items-center gap-4 p-2 px-4 transition-all',
					'hover:bg-accent hover:rounded-md'
				)}
			>
				<WiseIcon url={category.icon.url} size={iconSize} />
				<span class="text-md font-semibold">{category.name}</span>
			</span>
		</DialogTrigger>

		<CategoryDialog {category} />
	</Dialog>
{/snippet}
