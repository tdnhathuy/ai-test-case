<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	import Button from '@/lib/components/ui/button/button.svelte';
	import { Textarea } from '@/lib/components/ui/textarea';

	let value = '';

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		value = e.currentTarget.value;
	};

	const conClickCreateChecklist = () => {
		console.log(value);
	};
</script>

<div class="flex w-full flex-col gap-2 p-4">
	<Textarea
		placeholder="Mô tả test case"
		class="h-[16rem] w-full resize-none"
		onchange={handleChange}
	/>
	<Button class="w-fit" onclick={conClickCreateChecklist}>Tạo checklist</Button>
</div>
