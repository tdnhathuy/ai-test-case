<script lang="ts">
	import { useGetListWallet } from '@/lib/common/services/mutations/app.query';
	import WalletCard from '../components/card/wallet-card.svelte';
	import WalletCreateCard from '../components/card/wallet-create-card.svelte';

	const queryWallet = useGetListWallet();

	const listWallet = $derived($queryWallet.data || []);
</script>

<div class="flex flex-1 gap-4">
	<WalletCreateCard />
	{#each listWallet as wallet}
		<WalletCard {wallet} />
	{/each}
</div>
