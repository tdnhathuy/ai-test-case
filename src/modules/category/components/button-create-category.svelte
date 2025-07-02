<script lang="ts">
	import { genMongoId } from '@/lib/common/helpers';
	import type { Category } from '@/lib/common/types/app.type';
	import { Dialog, DialogTrigger } from '@/lib/components/ui/dialog';
	import { WiseButton } from '@/lib/components/wise';
	import CategoryDialog from './category-dialog/category.dialog.svelte';

	let category = $state<Category>({
		id: genMongoId(),
		name: '',
		type: 'Income',
		children: [],
		icon: null,
		idParent: null
	});
</script>

<Dialog>
	<DialogTrigger class="self-end">
		<WiseButton>Thêm danh mục</WiseButton>
	</DialogTrigger>

	<CategoryDialog {category} isCreate />
</Dialog>
