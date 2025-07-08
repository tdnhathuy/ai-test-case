<script lang="ts">
	import type { Transaction } from '@/lib/common/types/app.type';
	import { Stack, WiseIcon } from '@/lib/components/wise';
	import { cn } from '@/lib/utils';
	import { MoreVertical } from '@lucide/svelte';
	type Props = {
		transaction: Transaction;
	};

	let { transaction }: Props = $props();

	const label = $derived(transaction.category?.name || 'Chưa phân loại');
	const isExpense = $derived(transaction.category?.type === 'Expense');
	const amount = $derived(transaction.amount);
</script>

<div class="flex gap-4 rounded-sm border-t bg-white px-4 py-2 shadow">
	<span class="flex size-10 items-center justify-center rounded-full border shadow">
		<WiseIcon icon={transaction.category?.icon} size="sm" />
	</span>

	<Stack class="flex flex-1  items-start gap-0 	">
		<span class="text-md font-medium">{label}</span>
		<span class="text-sm text-gray-500">{transaction.description}</span>
	</Stack>

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
				{amount}
			</span>
		</span>
	</Stack>
</div>
