<script lang="ts">
	import { useDeleteWallet } from '@/lib/common/services/mutations/app.mutation';
	import { WiseButton } from '@/lib/components/wise';
	import type { WalletDialogProps } from '../wallet.dialog.svelte';

	let { wallet = $bindable(), refClose = $bindable() }: WalletDialogProps = $props();

	const mutation = useDeleteWallet();

	const onPressDelete = () => {
		$mutation.mutateAsync(wallet.id);
		refClose?.click();
	};
</script>

<WiseButton variant="destructive" onclick={onPressDelete}>Delete</WiseButton>
