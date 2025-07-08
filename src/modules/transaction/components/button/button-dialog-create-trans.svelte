<script lang="ts">
	import { WiseButton } from '@/lib/components/wise';
	import { storeDialogTransaction } from '@/lib/store/dialog.store';
	import TransactionDialog from '../dialog/transaction.dialog.svelte';

	const onOpenDialog = () => {
		$storeDialogTransaction.open = true;
		$storeDialogTransaction.mode = 'create';
		$storeDialogTransaction.transaction = {
			id: '',
			amount: 0,
			date: new Date().toISOString(),
			description: '',
			category: null,
			wallet: null
		};
	};
</script>

<WiseButton variant="gradient" onclick={onOpenDialog}>Tạo Giao Dịch</WiseButton>

<TransactionDialog />
