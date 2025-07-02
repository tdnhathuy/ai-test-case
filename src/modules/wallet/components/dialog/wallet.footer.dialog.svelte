<script lang="ts">
	import { DialogClose, DialogFooter } from '@/lib/components/ui/dialog';
	import { WiseButton } from '@/lib/components/wise';
	import ButtonCreateWallet from '@/modules/wallet/components/dialog/button/button-create-wallet.svelte';
	import ButtonDelelteWallet from '@/modules/wallet/components/dialog/button/button-delete-wallet.svelte';
	import ButtonUpdateWallet from '@/modules/wallet/components/dialog/button/button-update-wallet.svelte';
	import type { WalletDialogProps } from '@/modules/wallet/components/dialog/wallet.dialog.svelte';

	let { wallet = $bindable(), isCreate }: WalletDialogProps = $props();
	let refClose: HTMLButtonElement | null = $state(null);
</script>

<DialogFooter>
	<ButtonDelelteWallet bind:wallet bind:refClose />

	<DialogClose>
		<WiseButton>Huỷ</WiseButton>
	</DialogClose>

	{#if isCreate}
		<ButtonCreateWallet bind:wallet bind:refClose />
	{:else}
		<ButtonUpdateWallet bind:wallet bind:refClose />
	{/if}
</DialogFooter>

<DialogClose bind:ref={refClose} />
