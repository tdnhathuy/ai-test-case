<script lang="ts">
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '@/lib/components/svelte/accordion';
	import AccordionCheckListItem from '@/modules/create-test-case/components/checklist/accordion-check-list-item.svelte';
	import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';

	$: checklist = $createTestCaseStore.step2.checklist.original || [];
</script>

<Accordion type="multiple" value={checklist.map((item) => item.id)}>
	{#each checklist as checklist}
		<AccordionItem value={checklist.id} class="mb-2 rounded-md border p-4">
			<AccordionTrigger class="p-0">
				<span>{checklist.description}</span>
			</AccordionTrigger>

			<AccordionContent class="p-0 pt-2">
				<ul class="ml-6 flex flex-col gap-2">
					{#each checklist.items as item}
						<AccordionCheckListItem {item} />
					{/each}
				</ul>
			</AccordionContent>
		</AccordionItem>
	{/each}
</Accordion>
