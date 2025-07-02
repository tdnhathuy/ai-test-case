<script lang="ts">
	import { Label } from '@/lib/components/ui/label';
	import { RadioGroup, RadioGroupItem } from '@/lib/components/ui/radio-group';
	import { EnumCategoryType } from '@/lib/common/enum/collection.enum';
	import type { Category } from '@/lib/common/types/app.type';

	type Props = {
		category: Category;
	};

	let { category = $bindable() }: Props = $props();
</script>

<RadioGroup class="flex flex-row justify-around gap-4" bind:value={category.type}>
	<div class="flex items-center space-x-2">
		<RadioGroupItem value={EnumCategoryType.Income} id={EnumCategoryType.Income} />
		<Label for={EnumCategoryType.Income}>Thu</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroupItem value={EnumCategoryType.Expense} id={EnumCategoryType.Expense} />
		<Label for={EnumCategoryType.Expense}>Chi</Label>
	</div>
</RadioGroup>
