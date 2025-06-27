<script lang="ts">
	import {
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogContent,
		DialogFooter
	} from '@/lib/components/ui/dialog';
	import Stack from '@/lib/components/svelte/stack.svelte';
	import Icon from '@/lib/components/svelte/icon.svelte';
	import type { Category, ChildCategory } from '@/lib/common/types/app.type';
	import ButtonBase from '@/lib/components/svelte/button/button-base.svelte';
	import DialogClose from '@/lib/components/ui/dialog/dialog-close.svelte';
	import Input from '@/lib/components/ui/input/input.svelte';
	import LabelSection from '@/lib/components/svelte/label-section.svelte';

	let { category }: { category: Category | ChildCategory } = $props();

	let name = $state(category.name);

	const onPressSave = () => {
		console.log('save');
		console.log('name', name);
	};
</script>

<DialogContent>
	<DialogHeader>
		<DialogTitle>{category.name}</DialogTitle>
	</DialogHeader>

	<DialogDescription>
		<Stack class=" flex flex-col items-center gap-4">
			<button class=" cursor-pointer">
				<Icon url={category.icon} size={'lg'} />
			</button>

			<LabelSection label="Tên danh mục" class="w-full">
				<Input type="text" placeholder="Tên danh mục" class="w-full" bind:value={name} />
			</LabelSection>
		</Stack>
	</DialogDescription>

	<DialogFooter>
		<DialogClose>
			<ButtonBase variant="outline">Huỷ</ButtonBase>
		</DialogClose>

		<ButtonBase onclick={onPressSave}>Lưu</ButtonBase>
	</DialogFooter>
</DialogContent>
