<script lang="ts">
	import { useCreateTrans } from '@/lib/common/services';
	import type { Transaction } from '@/lib/common/types';
	import { WiseButton } from '@/lib/components/wise';
	import { storeDialogTransaction } from '@/lib/store/dialog.store';

	type Props = {
		transaction?: Transaction;
	};

	let { transaction = $bindable() }: Props = $props();

	const mutate = useCreateTrans();

	const handleCreateTrans = async () => {
		if (transaction) {
			await $mutate.mutateAsync({ transaction });
			$storeDialogTransaction.open = false;
		}
	};
</script>

<WiseButton onclick={handleCreateTrans}>Tạo Giao Dịch</WiseButton>
