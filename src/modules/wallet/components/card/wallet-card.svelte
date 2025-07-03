<script lang="ts">
	import { CDNIcon } from '@/lib/common/configs/cdn.config';
	import type { IWalletType } from '@/lib/common/enum/collection.enum';
	import type { Wallet } from '@/lib/common/types/app.type';
	import Stack from '@/lib/components/wise/stack.svelte';
	import { Dialog, DialogTrigger } from '@/lib/components/ui/dialog';
	import { WiseIcon } from '@/lib/components/wise';
	import WalletDialog from '../dialog/wallet.dialog.svelte';
	import WrapperCard from './wrapper-card.svelte';

	const { wallet } = $props<{ wallet: Wallet }>();
</script>

<div>
	<Dialog>
		<DialogTrigger class="cursor-pointer">
			<WrapperCard>
				<div class="flex flex-1 flex-col gap-2">
					<div class="flex flex-1 items-center justify-center">
						<WiseIcon icon={wallet.icon} />
					</div>

					<span class=" flex flex-1 justify-center">
						<span>{wallet.name}</span>
					</span>

					<Stack class="items-center justify-between">
						{@render renderIcon(wallet.type)}
						<Stack class="items-center gap-1 text-xs">
							<span>{wallet.initBalance}</span>
							<WiseIcon url={CDNIcon.balance} size="xs" />
						</Stack>
					</Stack>
				</div>
			</WrapperCard>
		</DialogTrigger>

		<WalletDialog {wallet} />
	</Dialog>
</div>

{#snippet renderIcon(walletType: IWalletType)}
	{#if walletType === 'Cash'}
		<WiseIcon url={CDNIcon.cash} size="xs" />
	{:else if walletType === 'Credit'}
		<WiseIcon url={CDNIcon.credit} size="xs" />
	{:else if walletType === 'Crypto'}
		<WiseIcon url={CDNIcon.cash} size="xs" />
	{/if}
{/snippet}
