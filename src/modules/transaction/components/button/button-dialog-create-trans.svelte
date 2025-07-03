<script lang="ts">
	import { Dialog, DialogTrigger } from '@/lib/components/ui/dialog';
	import { WiseButton } from '@/lib/components/wise';
	import TransactionDialog from '../dialog/transaction.dialog.svelte';
</script>

<Dialog>
	<DialogTrigger>
		<WiseButton>Tạo Giao Dịch</WiseButton>
	</DialogTrigger>

	<TransactionDialog isCreate />
</Dialog>
