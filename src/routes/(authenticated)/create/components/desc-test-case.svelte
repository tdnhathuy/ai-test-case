<script lang="ts">
	import { Button } from '@/lib/components/ui/button';
	import { Textarea } from '@/lib/components/ui/textarea';
	import { createChecklist } from '@/lib/services/api.service';
	import { createMutation } from '@tanstack/svelte-query';
	import Checklist from './checklist.svelte';
	let { promptCreate } = $props();

	const createChecklistMutation = createMutation({ mutationFn: createChecklist });
	const { data: data2 } = $createChecklistMutation;

	const { isPending, error, data, isError, isSuccess } = $derived($createChecklistMutation);

	const isLoading = $derived(isPending);
	const checklist = $derived(data || []);

	const handleCreateChecklist = async () => {
		if (!promptCreate.description.trim()) {
			return;
		}

		$createChecklistMutation.mutate(promptCreate.description);
	};

	const resetMutation = () => {
		$createChecklistMutation.reset();
	};

	const retryMutation = () => {
		if (promptCreate.description.trim()) {
			$createChecklistMutation.mutate(promptCreate.description);
		}
	};
</script>

<div class="flex w-full flex-col gap-4 p-4">
	<Textarea
		placeholder="Mô tả test case (ví dụ: test login feature)"
		class="h-[16rem] w-full resize-none"
		value={promptCreate.description}
		onchange={(e) => (promptCreate.description = e.currentTarget.value)}
	/>

	<div class="flex gap-2">
		<Button class="w-fit" onclick={handleCreateChecklist} disabled={isLoading}>
			{#if isLoading}
				<svg class="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				Đang tạo...
			{:else}
				Tạo checklist
			{/if}
		</Button>

		{#if isError}
			<Button variant="outline" onclick={retryMutation} disabled={isLoading}>Thử lại</Button>
		{/if}

		{#if checklist || error}
			<Button variant="outline" onclick={resetMutation} disabled={isLoading}>Xóa kết quả</Button>
		{/if}
	</div>

	{#if isSuccess && checklist}
		<Checklist {checklist} />
	{/if}
</div>
