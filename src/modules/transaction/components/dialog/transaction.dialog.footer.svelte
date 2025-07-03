<script lang="ts">
	import { useCreateTrans } from '@/lib/common/services';
	import type { Transaction } from '@/lib/common/types';
	import { DialogFooter } from '@/lib/components/ui/dialog';
	import { WiseButton } from '@/lib/components/wise';

	type Props = {
		transaction: Transaction;
	};

	let { transaction = $bindable() }: Props = $props();
    
	const onCreateTrans = () => {
        console.log('transaction', {...transaction})
	};
</script>

<DialogFooter>
	<WiseButton onclick={onCreateTrans}>Tạo giao dịch</WiseButton>
</DialogFooter>
