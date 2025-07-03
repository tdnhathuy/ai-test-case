<script lang="ts">
	import type { Transaction } from '@/lib/common/types/app.type';
	import { Dialog, DialogTrigger } from '@/lib/components/ui/dialog';
	import { WiseIcon } from '@/lib/components/wise';
	import TransactionDialog from '../dialog/transaction.dialog.svelte';
	type Props = {
		transaction: Transaction;
	};

	let { transaction }: Props = $props();
</script>

<Dialog>
	<DialogTrigger>
		<div class="flex cursor-pointer gap-2 rounded-sm border-t bg-white px-4 py-2 shadow">
			<span class="flex flex-1 items-center gap-2">
				<WiseIcon icon={transaction.category?.icon} size="sm" />
				<span class="text-sm text-gray-500"
					>{transaction.category?.name ? transaction.category?.name : 'Chưa phân loại'}</span
				>
				<span class="text-sm text-gray-500">{transaction.description}</span>
			</span>

			<span class="text-sm text-gray-500">{transaction.amount}</span>
		</div>
	</DialogTrigger>

	<TransactionDialog {transaction} />
</Dialog>
