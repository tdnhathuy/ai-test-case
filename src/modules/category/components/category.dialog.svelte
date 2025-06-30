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
	import { route } from '@/lib/ROUTES';
	import { api } from '@/lib/common/services/api';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';

	const queryClient = useQueryClient();

	const mutation = createMutation({
		mutationFn: async (payload: { name: string }) => {
			const url = route('PATCH /api/profile/category/[id]', { id: category.id });
			await api.patch(url, payload);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['category'] });
			hiddenCloseBtn?.click();
		}
	});

	let { category }: { category: Category | ChildCategory } = $props();

	let name = $state(category.name);
	let hiddenCloseBtn: HTMLButtonElement | null = $state(null);

	const onPressSave = async () => {
		const payload = { name };
		$mutation.mutateAsync(payload);
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
