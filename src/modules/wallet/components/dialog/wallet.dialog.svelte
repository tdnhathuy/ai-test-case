<script lang="ts">
	import type { Wallet } from '@/lib/common/types';
	import LabelSection from '@/lib/components/svelte/label-section.svelte';
	import { WiseIconSelector } from '@/lib/components/wise';
	import WiseDialogContent from '@/lib/components/wise/dialog/wise-dialog-content.svelte';
	import WiseInput from '@/lib/components/wise/wise-input.svelte';
	import WalletFooterDialog from './wallet.footer.dialog.svelte';
	import WalletTypeRadio from './wallet-type.radio.svelte';

	export type WalletDialogProps = {
		wallet: Wallet;
		isCreate?: boolean;
		refClose?: HTMLButtonElement | null;
	};

	const props: WalletDialogProps = $props();

	let wallet = $state({ ...props.wallet, icon: props.wallet.icon || null });
</script>

<WiseDialogContent title="Tạo ví" {footer} class="flex flex-col gap-4">
	<WiseIconSelector bind:icon={wallet.icon} />
	<span class="flex flex-col gap-4">
		<LabelSection label="Tên ví" class="w-full">
			<WiseInput type="text" placeholder="Tên ví" bind:value={wallet.name} />
		</LabelSection>

		<LabelSection label="Số dư" class="w-full">
			<WiseInput type="number" placeholder="Số dư" bind:value={wallet.initBalance} />
		</LabelSection>

		<WalletTypeRadio bind:wallet />
	</span>
</WiseDialogContent>

{#snippet footer()}
	<WalletFooterDialog {...props} bind:wallet />
{/snippet}
