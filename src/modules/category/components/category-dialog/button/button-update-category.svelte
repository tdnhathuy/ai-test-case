<script lang="ts">
	import { useUpdateCategory } from '@/lib/common/services/mutations/app.mutation';
	import type { Category } from '@/lib/common/types/app.type';
	import { WiseButton } from '@/lib/components/wise';

	type Props = {
		category: Category;
		refClose: HTMLButtonElement | null;
	};

	const updateMutation = useUpdateCategory();
	let { category = $bindable(), refClose = $bindable() }: Props = $props();

	const handleSave = async (): Promise<void> => {
		await $updateMutation.mutateAsync(category);
		refClose?.click();
	};
</script>

<WiseButton onclick={handleSave} loading={$updateMutation.isPending}>Cập nhật</WiseButton>
