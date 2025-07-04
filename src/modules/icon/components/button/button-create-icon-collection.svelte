<script>
	import { useCreateIconCollection } from '@/lib/common/services';
	import { WiseButton, WiseInput } from '@/lib/components/wise';
	import Stack from '@/lib/components/wise/stack.svelte';

	let name = $state('');

	const mutateCreate = useCreateIconCollection();

	function click() {
		$mutateCreate.mutateAsync({ name });
	}
</script>

<Stack class="gap-2" vertical>
	<WiseInput placeholder="Tên bộ sưu tập" bind:value={name} />
	<WiseButton onclick={click}>Tạo Bộ sưu tập</WiseButton>
</Stack>



