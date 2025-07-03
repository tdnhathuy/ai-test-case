<script lang="ts">
	import { useCreateTrans } from '@/lib/common/services';
	import type { Transaction } from '@/lib/common/types';
	import { WiseButton } from '@/lib/components/wise';

	type Props = {
		transaction: Transaction;
		refClose: HTMLButtonElement | null;
	};

	let { transaction = $bindable(), refClose }: Props = $props();

	const mutate = useCreateTrans();

	const handleCreateTrans = () => {
		$mutate.mutateAsync({ transaction });
		refClose?.click();
	};
</script>

<WiseButton onclick={handleCreateTrans}>Tạo Giao Dịch</WiseButton>
