<script lang="ts">
	import { queryClient } from '@/lib/common/configs/query-client.config';
	import { QueryKeys } from '@/lib/common/constant/key.const';
	import type { Category } from '@/lib/common/types/app.type';
	import Stack from '@/lib/components/wise/stack.svelte';
	import {
		Popover,
		PopoverClose,
		PopoverContent,
		PopoverTrigger
	} from '@/lib/components/ui/popover';
	import WiseIcon from '@/lib/components/wise/wise-icon.svelte';

	interface Props {
		category: Category;
	}
	let { category = $bindable() }: Props = $props();

	// Get all categories from query cache
	const allCategories = $derived(
		queryClient.getQueryData<Category[]>([QueryKeys.getCategory]) ?? []
	);

	// Filter categories by the same type as current category
	const availableParentCategories = $derived(
		allCategories.filter((cat) => cat.type === category.type)
	);

	// Find the currently selected parent category
	const selectedParentCategory = $derived(
		availableParentCategories.find((cat) => cat.id === category.idParent)
	);

	// Filter out the currently selected parent from options
	const parentCategoryOptions = $derived(
		availableParentCategories.filter((cat) => cat.id !== category.idParent)
	);

	// Handle parent category selection
	const handleParentCategorySelect = (selectedCategory: Category): void => {
		category = { ...category, idParent: selectedCategory.id };
	};

	// Handle removing parent category
	const handleRemoveParentCategory = (): void => {
		category = { ...category, idParent: null };
	};
</script>

<Stack class="w-full">
	<span class="text-sm font-medium text-gray-700">Danh mục cha:</span>

	{#if selectedParentCategory}
		<Popover>
			<PopoverTrigger
				class="flex w-full items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-left hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			>
				<WiseIcon url={selectedParentCategory.icon?.url} size="sm" />
				<span class="flex-1">{selectedParentCategory.name}</span>
				<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</PopoverTrigger>

			<PopoverContent class="w-64 p-2">
				<Stack vertical class="gap-1">
					<!-- Option to remove parent category -->
					<PopoverClose
						onclick={handleRemoveParentCategory}
						class="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					>
						<div class="flex h-6 w-6 items-center justify-center rounded bg-gray-200">
							<svg
								class="h-4 w-4 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</div>
						<span class="text-gray-600">Không có danh mục cha</span>
					</PopoverClose>

					{#if parentCategoryOptions.length > 0}
						<div class="my-1 border-t border-gray-100"></div>

						{#each parentCategoryOptions as option (option.id)}
							<PopoverClose
								onclick={() => handleParentCategorySelect(option)}
								class="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
							>
								<WiseIcon url={option.icon?.url} size="sm" />
								<span>{option.name}</span>
							</PopoverClose>
						{/each}
					{/if}
				</Stack>
			</PopoverContent>
		</Popover>
	{:else}
		<div class="flex items-center justify-between">
			<span class="text-gray-500">Không có</span>

			{#if parentCategoryOptions.length > 0}
				<Popover>
					<PopoverTrigger
						class="cursor-pointer text-sm text-blue-600 hover:text-blue-800 focus:underline focus:outline-none"
					>
						Chọn danh mục cha
					</PopoverTrigger>

					<PopoverContent class="w-64 p-2">
						<Stack vertical class="gap-1">
							{#each parentCategoryOptions as option (option.id)}
								<PopoverClose
									onclick={() => handleParentCategorySelect(option)}
									class="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
								>
									<WiseIcon url={option.icon?.url} size="sm" />
									<span>{option.name}</span>
								</PopoverClose>
							{/each}
						</Stack>
					</PopoverContent>
				</Popover>
			{/if}
		</div>
	{/if}
</Stack>
