<script lang="ts">
	import { genDefaultTrans } from '@/lib/common/helpers';
	import type { Transaction } from '@/lib/common/types';
	import LabelSection from '@/lib/components/svelte/label-section.svelte';
	import { Stack, WiseDialogContent, WiseInput, WiseTextArena } from '@/lib/components/wise';
	import { CategorySelection, WalletSelection } from '../selection';
	import TransactionDialogFooter from './transaction.dialog.footer.svelte';
	type Props = {
		transaction?: Transaction;
		isCreate?: boolean;
	};

	let props: Props = $props();

	let transaction = $state(genDefaultTrans(props.transaction));

	$effect(() => {
		transaction = genDefaultTrans(props.transaction);
	});
</script>

<WiseDialogContent title={props.isCreate ? 'Thêm giao dịch' : 'Chi tiết giao dịch'} {footer}>
	<section class="flex flex-col gap-4">
		<LabelSection label="Số tiền" vertical>
			<WiseInput class="w-48 text-right" type="number" bind:value={transaction.amount} />
		</LabelSection>

		<Stack class=" justify-around" vertical>
			<LabelSection vertical>
				<WalletSelection bind:transaction />
			</LabelSection>

			<LabelSection vertical>
				<CategorySelection bind:transaction />
			</LabelSection>
		</Stack>

		<LabelSection label="Mô tả">
			<WiseTextArena class="h-24 w-full" bind:value={transaction.description} />
		</LabelSection>
	</section>
</WiseDialogContent>

{#snippet footer()}
	<TransactionDialogFooter bind:transaction isCreate={props.isCreate} />
{/snippet}
