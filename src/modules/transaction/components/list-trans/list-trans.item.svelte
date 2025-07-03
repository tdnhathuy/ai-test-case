<script lang="ts">
	import { formatDate } from '@/lib/common/helpers';
	import type { Transaction } from '@/lib/common/types/app.type';
	type Props = {
		transaction: Transaction;
	};

	let { transaction }: Props = $props();
</script>

<div class="flex cursor-pointer gap-2 rounded-sm border-t bg-white px-4 py-2 shadow">
	<!-- <span class="text-sm text-gray-500">{formatDate(transaction.date)}</span> -->

	<span class="flex flex-1 items-center gap-2">
		<span class="text-sm text-gray-500"
			>{transaction.category?.name ? transaction.category?.name : 'Chưa phân loại'}</span
		>
		<span class="text-sm text-gray-500">{transaction.description}</span>
	</span>

	<span class="text-sm text-gray-500">{transaction.amount}</span>
</div>
