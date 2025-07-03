<script lang="ts">
	import type { Transaction } from '@/lib/common/types/app.type';
	import { Dialog, DialogTrigger } from '@/lib/components/ui/dialog';
	import { Stack, WiseIcon } from '@/lib/components/wise';
	import TransactionDialog from '../dialog/transaction.dialog.svelte';
	import { MoreVertical } from '@lucide/svelte';
	import { cn } from '@/lib/utils';
	type Props = {
		transaction: Transaction;
	};

	let { transaction }: Props = $props();

	// Create a reactive copy to avoid mutating the original
	let transactionCopy = $derived(structuredClone(transaction));

	const isExpense = transaction.category?.type === 'Expense';
</script>

<Dialog>
	<DialogTrigger>
		<div class="flex cursor-pointer gap-4 rounded-sm border-t bg-white px-4 py-2 shadow">
			<span class="flex size-10 items-center justify-center rounded-full border shadow">
				<WiseIcon icon={transaction.category?.icon} size="sm" />
			</span>

			<span class="flex flex-1 items-center gap-2">
				<span class="text-sm text-gray-500"
					>{transaction.category?.name ? transaction.category?.name : 'Chưa phân loại'}</span
				>
				<span class="text-sm text-gray-500">{transaction.description}</span>
			</span>

			<Stack class="items-end ">
				<MoreVertical size={14} />

				<span class="flex items-center gap-px">
					<span class="-mt-[2px]">
						{#if isExpense}
							<span class="text-sm text-red-400">-</span>
						{:else}
							<span class="text-sm text-green-500">+</span>
						{/if}
					</span>

					<span class={cn('text-sm text-gray-500', isExpense ? 'text-red-400' : 'text-green-500')}>
						{transaction.amount}
					</span>
				</span>
			</Stack>
		</div>
	</DialogTrigger>

	<TransactionDialog transaction={transactionCopy} />
</Dialog>
