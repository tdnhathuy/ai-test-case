<script lang="ts">
	import LabelSection from '@/lib/components/svelte/label-section.svelte';
	import { Dialog } from '@/lib/components/ui/dialog';
	import {
		WiseDialogContent,
		WiseInput,
		WiseInputDate,
		WiseTextArena
	} from '@/lib/components/wise';
	import { storeDialogTransaction } from '@/lib/store/dialog.store';
	import { ButtonCreateTrans, ButtonUpdateTrans } from '../button';
	import { SelectorCategory, SelectorWallet } from '../selection';

	const isCreate = $derived($storeDialogTransaction.isCreate);

	const title = $derived(isCreate ? 'Thêm giao dịch' : 'Chi tiết giao dịch');

	let transaction = $state($storeDialogTransaction.transaction);

	$effect(() => {
		transaction = $storeDialogTransaction.transaction;
	});
</script>

{#if transaction}
	<Dialog bind:open={$storeDialogTransaction.open}>
		<WiseDialogContent {title}>
			<span>{transaction.amount}</span>

			<div class="grid w-full grid-cols-2 gap-4">
				<LabelSection class="col-span-2" label="Số tiền">
					<WiseInput
						class="not-motion-reduce: spin text-left"
						type="number"
						bind:value={transaction.amount}
					/>
				</LabelSection>

				<LabelSection class="w-full" label="Ví">
					<SelectorWallet bind:transaction />
				</LabelSection>

				<LabelSection class="w-full" label="Danh mục">
					<SelectorCategory bind:transaction />
				</LabelSection>

				<LabelSection class="col-span-2" label="Mô tả">
					<WiseTextArena class="h-24 w-full" bind:value={transaction.description} />
				</LabelSection>

				<WiseInputDate bind:value={transaction.date} class="col-span-1" />

				<div class="col-span-1 flex justify-end">
					{#if $storeDialogTransaction.isCreate}
						<ButtonCreateTrans bind:transaction />
					{:else}
						<ButtonUpdateTrans bind:transaction />
					{/if}
				</div>
			</div>
		</WiseDialogContent>
	</Dialog>
{/if}
