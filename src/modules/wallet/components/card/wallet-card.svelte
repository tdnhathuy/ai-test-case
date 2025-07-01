<script lang="ts">
	import type { Wallet } from '@/lib/common/types/app.type';
	import { Dialog, DialogTrigger } from '@/lib/components/ui/dialog';
	import { WiseIcon } from '@/lib/components/wise';
	import WrapperCard from './wrapper-card.svelte';
	import WalletDialog from '@/modules/wallet/components/dialog/wallet-dialog.svelte';

	const { wallet } = $props<{ wallet: Wallet }>();
</script>

<div>
	<Dialog>
		<DialogTrigger class="cursor-pointer">
			<WrapperCard>
				<div class="flex flex-col gap-2">
					<div class="flex flex-col gap-2">
						<WiseIcon url={wallet.icon} />
						<span>{wallet.name}</span>
						<span>{wallet.balance}</span>
					</div>
				</div>
			</WrapperCard>
		</DialogTrigger>

		<WalletDialog {wallet} />
	</Dialog>
</div>
