<script lang="ts">
	import { EnumWalletType } from '@/lib/common/enum/collection.enum';
	import { Label } from '@/lib/components/ui/label';
	import { RadioGroup, RadioGroupItem } from '@/lib/components/ui/radio-group';
	import type { WalletDialogProps } from '@/modules/wallet/components/dialog/wallet.dialog.svelte';

	let { wallet = $bindable() }: WalletDialogProps = $props();
</script>

<RadioGroup class="flex flex-row justify-around gap-4" bind:value={wallet.type}>
	<div class="flex items-center space-x-2">
		<RadioGroupItem value={EnumWalletType.Cash} id={EnumWalletType.Cash} />
		<Label for={EnumWalletType.Cash}>Tiền mặt</Label>
	</div>

	<div class="flex items-center space-x-2">
		<RadioGroupItem value={EnumWalletType.Credit} id={EnumWalletType.Credit} />
		<Label for={EnumWalletType.Credit}>Tín dụng</Label>
	</div>
</RadioGroup>
