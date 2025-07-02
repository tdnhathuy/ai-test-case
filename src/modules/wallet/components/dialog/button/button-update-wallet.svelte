<script lang="ts">
	import { useUpdateWallet } from '@/lib/common/services/mutations/app.mutation';
	import { WiseButton } from '@/lib/components/wise';
	import type { WalletDialogProps } from '../wallet.dialog.svelte';

	let { wallet = $bindable(), refClose = $bindable() }: WalletDialogProps = $props();

	const mutation = useUpdateWallet();

	const onPressCreate = () => {
		$mutation.mutateAsync({ wallet });
		refClose?.click();
	};
</script>

<WiseButton onclick={onPressCreate}>Cập nhập</WiseButton>
