<script lang="ts">
	import { genMongoId } from '@/lib/common/helpers';
	import { useCreateTrans } from '@/lib/common/services';
	import type { Transaction } from '@/lib/common/types';
	import { Dialog, DialogTrigger } from '@/lib/components/ui/dialog';
	import { WiseButton } from '@/lib/components/wise';
	import TransactionDialog from '../dialog/transaction.dialog.svelte';

	const mutate = useCreateTrans();

	const handleCreateTrans = () => {
		const transaction: Transaction = {
			id: genMongoId(),
			amount: 0,
			date: new Date().toISOString(),
			description: '',
			category: null,
			wallet: null
		};
		$mutate.mutateAsync({ transaction });
	};
</script>

<Dialog>
	<DialogTrigger>
		<WiseButton onclick={handleCreateTrans}>Tạo Giao Dịch</WiseButton>
	</DialogTrigger>

	<TransactionDialog />
</Dialog>
