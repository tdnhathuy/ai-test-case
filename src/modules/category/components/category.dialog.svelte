<script lang="ts">
	import { queryClient } from '@/lib/common/configs/query-client.config';
	import { QueryKeys } from '@/lib/common/constant/key.const';
	import type { PayloadUpdateCategory } from '@/lib/common/services/category.service';
	import { useUpdateCategory } from '@/lib/common/services/mutations/app.muation';
	import type { Category, Icon } from '@/lib/common/types/app.type';
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
	const mutation = useUpdateCategory();

	type Props = {
		category: Category;
	};

	let props: Props = $props();
	let category = $state(props.category);
	let icon = $state<Icon>(category.icon);

	let ref: HTMLButtonElement | null = $state(null);

	const onPressSave = async () => {
		const payload: PayloadUpdateCategory = {
			name: category.name,
			idCategory: category.id,
			idIcon: icon.id
		};
		await $mutation.mutateAsync(payload, { onSuccess });
	};

	const onSuccess = () => {
		queryClient.invalidateQueries({ queryKey: [QueryKeys.getCategory] });
		ref?.click();
	};
</script>

<DialogContent>
	<DialogHeader>
		<DialogTitle>Update Category</DialogTitle>
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
