<script lang="ts">
	import type { Transaction } from '@/lib/common/types';
	import { DialogFooter } from '@/lib/components/ui/dialog';
	import DialogClose from '@/lib/components/ui/dialog/dialog-close.svelte';
	import { WiseInputDate } from '@/lib/components/wise';
	import { ButtonCreateTrans, ButtonUpdateTrans } from '@/modules/transaction/components/button';

	type Props = {
		transaction: Transaction;
		isCreate?: boolean;
	};

	let { transaction = $bindable(), isCreate }: Props = $props();

	let refClose = $state<HTMLButtonElement | null>(null);
</script>

<DialogFooter class="flex justify-between ">
	<WiseInputDate bind:value={transaction.date} />

	<div class="flex flex-1 items-end justify-end gap-2">
		{#if isCreate}
			<ButtonCreateTrans bind:transaction {refClose} />
		{:else}
			<ButtonUpdateTrans bind:transaction {refClose} />
		{/if}
	</div>
</DialogFooter>

<DialogClose bind:ref={refClose} />
