<script lang="ts">
	import type { Transaction } from '@/lib/common/types';
	import { DialogFooter } from '@/lib/components/ui/dialog';
	import DialogClose from '@/lib/components/ui/dialog/dialog-close.svelte';
	import { ButtonCreateTrans, ButtonUpdateTrans } from '@/modules/transaction/components/button';

	type Props = {
		transaction: Transaction;
		isCreate?: boolean;
	};

	let { transaction = $bindable(), isCreate }: Props = $props();

	let refClose = $state<HTMLButtonElement | null>(null);
</script>

<DialogFooter>
	{#if isCreate}
		<ButtonCreateTrans bind:transaction {refClose} />
	{:else}
		<ButtonUpdateTrans bind:transaction {refClose} />
	{/if}
</DialogFooter>

<DialogClose bind:ref={refClose} />
