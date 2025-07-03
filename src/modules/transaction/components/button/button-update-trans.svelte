<script lang="ts">
	import { useUpdateTrans } from '@/lib/common/services';
	import type { Transaction } from '@/lib/common/types';
	import { WiseButton } from '@/lib/components/wise';

	type Props = {
		transaction: Transaction;
		refClose: HTMLButtonElement | null;
	};

	let { transaction = $bindable(), refClose }: Props = $props();

	const mutate = useUpdateTrans();

	const handleUpdateTrans = () => {
		$mutate.mutateAsync({ transaction });
		refClose?.click();
	};
</script>

<WiseButton onclick={handleUpdateTrans}>Cập nhật Giao Dịch</WiseButton>
