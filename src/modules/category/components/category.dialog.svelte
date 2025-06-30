<script lang="ts">
	import { QueryKeys } from '@/lib/common/constant/key.const';
	import { ServiceCategory } from '@/lib/common/services/category.service';
	import type { Category, ChildCategory, Icon as IconType } from '@/lib/common/types/app.type';
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
	import { Popover } from '@/lib/components/ui/popover';
	import PopoverTrigger from '@/lib/components/ui/popover/popover-trigger.svelte';
	import IconSelectPopover from './icon-select.popover.svelte';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	const queryClient = useQueryClient();

	const mutation = createMutation({
		mutationFn: ServiceCategory.updateCategory,
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.getCategory] });
			hiddenCloseBtn?.click();
		}
	});

	let props: { category: Category | ChildCategory } = $props();
	let iconSelected = $state<IconType | undefined>(undefined);

	let category = $state(props.category);

	let hiddenCloseBtn: HTMLButtonElement | null = $state(null);

	const onPressSave = async () => {
		console.log('category', category);
		await $mutation.mutateAsync({
			name: category.name,
			idCategory: category.id,
			...(iconSelected ? { icon: iconSelected.id } : {})
		});
	};
</script>

<DialogContent>
	<DialogHeader>
		<DialogTitle>{category.name}</DialogTitle>
	</DialogHeader>

	<DialogDescription>
		<Stack class=" flex flex-col items-center gap-4">
			<Popover>
				<PopoverTrigger>
					<Icon url={iconSelected?.url || category.icon} size={'lg'} />
				</PopoverTrigger>
				<IconSelectPopover
					onSelect={(icon) => {
						iconSelected = icon;
					}}
				/>
			</Popover>

			<LabelSection label="Tên danh mục" class="w-full">
				<Input type="text" placeholder="Tên danh mục" class="w-full" bind:value={category.name} />
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
