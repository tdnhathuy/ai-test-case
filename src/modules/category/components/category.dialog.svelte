<script lang="ts">
	import { QueryKeys } from '@/lib/common/constant/key.const';
	import { ServiceCategory } from '@/lib/common/services/category.service';
	import type { Category, ChildCategory } from '@/lib/common/types/app.type';
	import ButtonBase from '@/lib/components/svelte/button/button-base.svelte';
	import Icon from '@/lib/components/svelte/icon.svelte';
	import LabelSection from '@/lib/components/svelte/label-section.svelte';
	import Stack from '@/lib/components/svelte/stack.svelte';
	import {
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '@/lib/components/ui/dialog';
	import DialogClose from '@/lib/components/ui/dialog/dialog-close.svelte';
	import Input from '@/lib/components/ui/input/input.svelte';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	const queryClient = useQueryClient();

	const mutation = createMutation({
		mutationFn: ServiceCategory.updateCategory,
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.getCategory] });
			hiddenCloseBtn?.click();
		}
	});

	let { category }: { category: Category | ChildCategory } = $props();

	let name = $state(category.name);
	let hiddenCloseBtn: HTMLButtonElement | null = $state(null);

	const onPressSave = async () => {
		await $mutation.mutateAsync({ name, idCategory: category.id });
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

		<DialogClose bind:ref={hiddenCloseBtn} class="hidden" />

		<ButtonBase onclick={onPressSave} loading={$mutation.isPending}>Lưu</ButtonBase>
	</DialogFooter>
</DialogContent>
