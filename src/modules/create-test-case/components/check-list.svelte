<script lang="ts">
	import ButtonBase from '@/lib/components/svelte/button/button-base.svelte';
	import InputArea from '@/lib/components/svelte/input/input-area.svelte';
	import LabelSection from '@/lib/components/svelte/label-section.svelte';
	import type { ChecklistItem } from '@/lib/types/app.type';
	import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
	import { Square, SquareCheck } from '@lucide/svelte';

	$: checklist = $createTestCaseStore.step2.checklist;
	$: isAllChecked = checklist.every((item) => item.checked);

	function toggleCheck(item: ChecklistItem) {
		createTestCaseStore.toggleChecklistItem(item.id);
	}

	const onCheckAll = () => {
		if (isAllChecked) {
			createTestCaseStore.updateStep2({
				checklist: checklist.map((item) => ({ ...item, checked: false }))
			});
		} else {
			createTestCaseStore.updateStep2({
				checklist: checklist.map((item) => ({ ...item, checked: true }))
			});
		}
	};
</script>

<div class="flex flex-col gap-4">
	<ButtonBase class="w-32  self-end" onclick={onCheckAll}>
		{#if isAllChecked}
			Uncheck All
		{:else}
			Check All
		{/if}
	</ButtonBase>

	<ul class="flex flex-col gap-2">
		{#each checklist as item (item.id)}
			<li class="flex items-center gap-1 rounded-md border p-2 px-4">
				<LabelSection label={item.title} class="flex flex-1 flex-col gap-1">
					<InputArea
						bind:value={item.description}
						class="flex w-full flex-1 flex-col text-xs text-gray-500 focus-within:text-black"
					/>
				</LabelSection>

				<span class="mt-2 flex justify-end gap-4">
					<button class="p-1" on:click={() => toggleCheck(item)}>
						{#if item.checked}
							<SquareCheck />
						{:else}
							<Square />
						{/if}
					</button>
				</span>
			</li>
		{/each}
	</ul>
</div>
