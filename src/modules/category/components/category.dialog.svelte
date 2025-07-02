<script lang="ts">
	import { queryClient } from '@/lib/common/configs/query-client.config';
	import { QueryKeys } from '@/lib/common/constant/key.const';
	import { useUpdateCategory } from '@/lib/common/services/mutations/app.mutation';
	import type { Category } from '@/lib/common/types/app.type';
	import ButtonBase from '@/lib/components/svelte/button/button-base.svelte';
	import Stack from '@/lib/components/svelte/stack.svelte';
	import {
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '@/lib/components/ui/dialog';
	import DialogClose from '@/lib/components/ui/dialog/dialog-close.svelte';
	import { WiseIconSelector } from '@/lib/components/wise';
	import WiseInput from '@/lib/components/wise/wise-input.svelte';
	import CategoryRadio from './category.radio.svelte';
	const mutation = useUpdateCategory();

	type Props = {
		category: Category;
	};

	let props: Props = $props();

	let category = $state(props.category);

	let ref: HTMLButtonElement | null = $state(null);

	const onPressSave = async () => {
		await $mutation.mutateAsync({ category }, { onSuccess });
	};

	const onSuccess = () => {
		queryClient.invalidateQueries({ queryKey: [QueryKeys.getCategory] });
		ref?.click();
	};
</script>

<DialogContent class="w-sm">
	<DialogHeader>
		<DialogTitle>Update Category</DialogTitle>
	</DialogHeader>

	<DialogDescription>
		<Stack vertical class="gap-4">
			<Stack class="items-center gap-2">
				<WiseIconSelector bind:icon={category.icon} />
				<WiseInput type="text" placeholder="Tên danh mục" bind:value={category.name} />
			</Stack>

			<CategoryRadio bind:category />
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
