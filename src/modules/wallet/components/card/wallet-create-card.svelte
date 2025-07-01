<script lang="ts">
	import { Dialog, DialogTrigger } from '@/lib/components/ui/dialog';
	import WalletCreateDialog from '@/modules/wallet/components/dialog/wallet-create-dialog.svelte';
	import { Plus } from '@lucide/svelte';
	import WrapperCard from './wrapper-card.svelte';
</script>

<div>
	<Dialog>
		<DialogTrigger>
			<WrapperCard className="flex cursor-pointer flex-col items-center justify-center">
				<Plus />
				<span>Tạo ví</span>
			</WrapperCard>
		</DialogTrigger>

		<WalletCreateDialog />
	</Dialog>
</div>
