<script lang="ts">
	import type { ChecklistItem } from '@/lib/types/app.type';
	import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
	import { CheckSquare2, Pen, Pencil, Square } from '@lucide/svelte';

	let { item }: { item: ChecklistItem } = $props();

	const selected = $derived($createTestCaseStore.step2.checklist.selected);

	const onclick = () => {
		if (selected.includes(item)) {
			createTestCaseStore.update((state) => ({
				...state,
				step2: {
					...state.step2,
					checklist: {
						...state.step2.checklist,
						selected: selected.filter((c) => c.id !== item.id) as ChecklistItem[]
					}
				}
			}));
		} else {
			createTestCaseStore.update((state) => ({
				...state,
				step2: {
					...state.step2,
					checklist: { ...state.step2.checklist, selected: [...selected, item] }
				}
			}));
		}
	};
</script>

<span class="flex items-center gap-2">
	<button class="cursor-pointer">
		<Pencil size={16} />
	</button>

	<span class="flex flex-1">{item.name}</span>

	<button class="cursor-pointer" {onclick}>
		{#if selected.includes(item)}
			<CheckSquare2 />
		{:else}
			<Square />
		{/if}
	</button>
</span>
