<script lang="ts">
	import { useDeleteCategory } from '@/lib/common/services/mutations/app.mutation';
	import type { Category } from '@/lib/common/types/app.type';
	import { WiseButton } from '@/lib/components/wise';

	type Props = {
		category: Category;
		refClose: HTMLButtonElement | null;
	};

	const deleteMutation = useDeleteCategory();
	let { category = $bindable(), refClose = $bindable() }: Props = $props();

	const handleSave = async (): Promise<void> => {
		await $deleteMutation.mutateAsync(category.id);
		refClose?.click();
	};
</script>

<WiseButton variant="destructive" onclick={handleSave} loading={$deleteMutation.isPending}>
	Xóa
</WiseButton>
