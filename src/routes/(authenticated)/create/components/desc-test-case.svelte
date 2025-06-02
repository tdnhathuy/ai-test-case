<script lang="ts">
	import { Button } from '@/lib/components/ui/button';
	import { Textarea } from '@/lib/components/ui/textarea';
	import { createChecklist } from '@/lib/services/api.service';

	let { promptCreate } = $props();
	let isLoading = $state(false);
	let checklist = $state('');
	let error = $state('');

	const conClickCreateChecklist = async () => {
		if (!promptCreate.description.trim()) {
			error = 'Vui lòng nhập mô tả test case';
			return;
		}

		isLoading = true;
		error = '';

		try {
			checklist = await createChecklist(promptCreate.description);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo checklist';
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex w-full flex-col gap-4 p-4">
	<Textarea
		placeholder="Mô tả test case"
		class="h-[16rem] w-full resize-none"
		value={promptCreate.description}
		onchange={(e) => (promptCreate.description = e.currentTarget.value)}
	/>

	<Button class="w-fit" onclick={conClickCreateChecklist} disabled={isLoading}>
		{isLoading ? 'Đang tạo...' : 'Tạo checklist'}
	</Button>

	{#if error}
		<div class="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
			{error}
		</div>
	{/if}

	{#if checklist}
		<div class="mt-4">
			<h3 class="mb-2 text-lg font-semibold">Checklist được tạo:</h3>
			<div class="rounded-lg border bg-gray-50 p-4 whitespace-pre-wrap">
				{checklist}
			</div>
		</div>
	{/if}
</div>
