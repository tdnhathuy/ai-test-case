<script lang="ts">
	import { Dialog, DialogTrigger } from '@/lib/components/ui/dialog';
	import WalletCreateDialog from '@/modules/wallet/components/dialog/wallet.dialog.svelte';
	import { Plus } from '@lucide/svelte';
	import WrapperCard from './wrapper-card.svelte';
	import { genMongoId } from '@/lib/common/helpers';
	import type { Wallet } from '@/lib/common/types';

	let wallet = $state<Wallet>({
		id: genMongoId(),
		name: '',
		icon: null,
		initBalance: 0,
		type: 'Cash'
	});
</script>

<div>
	<Dialog>
		<DialogTrigger>
			<WrapperCard className="flex cursor-pointer flex-col items-center justify-center">
				<Plus />
				<span>Tạo ví</span>
			</WrapperCard>
		</DialogTrigger>

		<WalletCreateDialog {wallet} isCreate />
	</Dialog>
</div>
