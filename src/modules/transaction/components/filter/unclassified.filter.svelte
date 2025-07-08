<script>
	import { WiseButton } from '@/lib/components/wise';
	import { storeFilterAPI } from '@/lib/store/filter.store';

	const handleClick = () => {
		const current = $storeFilterAPI.getTransaction.unclassified;
		$storeFilterAPI.getTransaction.unclassified = !current;
		console.log('$storeFilterAPI', $storeFilterAPI)
	};
</script>

<WiseButton
	variant={$storeFilterAPI.getTransaction.unclassified ? 'gradient' : 'outline'}
	class=""
	size="sm"
	onclick={handleClick}>Chưa phân loại</WiseButton
>
