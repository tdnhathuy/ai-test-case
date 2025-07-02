<script lang="ts">
	import { WiseButton } from '@/lib/components/wise';
	import type { WalletDialogProps } from '../wallet.dialog.svelte';
	import { useCreateWallet } from '@/lib/common/services/mutations/app.mutation';

	let { wallet = $bindable(), refClose = $bindable() }: WalletDialogProps = $props();

	const mutation = useCreateWallet();

	const onPressCreate = () => {
		$mutation.mutateAsync({ wallet });
		refClose?.click();
	};
</script>

<WiseButton onclick={onPressCreate}>Tạo</WiseButton>
