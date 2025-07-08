<script lang="ts">
	import { useUpdateTrans } from '@/lib/common/services';
	import type { Transaction } from '@/lib/common/types';
	import { WiseButton } from '@/lib/components/wise';
	import { storeDialogTransaction } from '@/lib/store/dialog.store';

	type Props = {
		transaction?: Transaction;
	};

	let { transaction = $bindable() }: Props = $props();

	const mutate = useUpdateTrans();

	const handleUpdateTrans = async () => {
		if (transaction) {
			await $mutate.mutateAsync({ transaction });
			$storeDialogTransaction.open = false;
		}
	};
</script>

<WiseButton onclick={handleUpdateTrans}>Cập nhật Giao Dịch</WiseButton>
