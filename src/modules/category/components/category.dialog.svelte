<script lang="ts">
	import { QueryKeys } from '@/lib/common/constant/key.const';
	import { genIconByUrl } from '@/lib/common/helpers';
	import { ServiceCategory } from '@/lib/common/services/category.service';
	import type { Category, ChildCategory, Icon } from '@/lib/common/types/app.type';
	import ButtonBase from '@/lib/components/svelte/button/button-base.svelte';
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
	import { WiseIconSelector } from '@/lib/components/wise';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	const queryClient = useQueryClient();

	const mutation = createMutation({
		mutationFn: ServiceCategory.updateCategory,
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.getCategory] });
			ref?.click();
		}
	});

	type Props = {
		category: Category | ChildCategory;
	};

	let { category }: Props = $props();
	let icon = $state<Icon>(genIconByUrl(category.icon));

	let ref: HTMLButtonElement | null = $state(null);

	const onPressSave = async () => {
		await $mutation.mutateAsync({
			name: category.name,
			idCategory: category.id,
			...(icon ? { icon: icon.id } : {})
		});
	};
</script>

<DialogContent>
	<DialogHeader>
		<DialogTitle>{category.name}</DialogTitle>
	</DialogHeader>

	<DialogDescription>
		<Stack class=" flex flex-col items-center gap-4">
			<WiseIconSelector bind:icon />

			<LabelSection label="Tên danh mục" class="w-full">
				<Input type="text" placeholder="Tên danh mục" class="w-full" bind:value={category.name} />
			</LabelSection>
		</Stack>
	</DialogDescription>

	<DialogFooter>
		<DialogClose>
			<ButtonBase variant="outline">Huỷ</ButtonBase>
		</DialogClose>

		<ButtonBase onclick={onPressSave} loading={$mutation.isPending}>Lưu</ButtonBase>
	</DialogFooter>

	<DialogClose bind:ref class="hidden" />
</DialogContent>
