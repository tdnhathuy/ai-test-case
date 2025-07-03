<script lang="ts">
	import { genDefaultTrans } from '@/lib/common/helpers';
	import type { Transaction } from '@/lib/common/types';
	import LabelSection from '@/lib/components/svelte/label-section.svelte';
	import { Stack, WiseDialogContent, WiseInput } from '@/lib/components/wise';
	import { CategorySelection, WalletSelection } from '../selection';
	import TransactionDialogFooter from './transaction.dialog.footer.svelte';
	type Props = {
		transaction?: Transaction;
		isCreate?: boolean;
	};

	let props: Props = $props();

	let transaction = $state(genDefaultTrans(props.transaction));
</script>

<WiseDialogContent title={props.isCreate ? 'Thêm giao dịch' : 'Chi tiết giao dịch'} {footer}>
	<section class="flex flex-col gap-4">
		<LabelSection label="Số tiền" vertical>
			<!-- <WiseInput class="w-48 text-right" type="number" bind:value={transaction.amount} /> -->
			<WiseInput class="w-48 text-right" type="number" value={transaction.amount} />
		</LabelSection>

		<Stack class=" justify-around">
			<LabelSection label="" vertical>
				<WalletSelection bind:transaction />
			</LabelSection>

			<LabelSection label="" vertical>
				<CategorySelection bind:transaction />
			</LabelSection>
		</Stack>

		<LabelSection label="Ngày" vertical>
			<WiseInput class="w-48 text-right" type="date" bind:value={transaction.date} />
		</LabelSection>

		<LabelSection label="Mô tả" vertical>
			<WiseInput class="w-48" type="text" bind:value={transaction.description} />
		</LabelSection>
	</section>
</WiseDialogContent>

{#snippet footer()}
	<TransactionDialogFooter {transaction} isCreate={props.isCreate} />
{/snippet}
