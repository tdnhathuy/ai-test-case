<script lang="ts">
	import { useCreateCategory } from '@/lib/common/services/mutations/app.mutation';
	import type { Category } from '@/lib/common/types/app.type';
	import { WiseButton } from '@/lib/components/wise';

	type Props = {
		category: Category;
		refClose: HTMLButtonElement | null;
	};

	const createMutation = useCreateCategory();
	let { category = $bindable(), refClose = $bindable() }: Props = $props();

	const handleSave = async (): Promise<void> => {
		await $createMutation.mutateAsync(category);
		refClose?.click();
	};
</script>

<WiseButton onclick={handleSave} loading={$createMutation.isPending}>Cập nhật</WiseButton>
