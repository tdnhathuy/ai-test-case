<script lang="ts">
	import { getUser } from '@/lib/common/helpers';
	import { useSidebar } from '@/lib/components/ui/sidebar';
	import { WiseButton } from '@/lib/components/wise';
	import { cn } from '@/lib/utils';
	import { Loader2, User } from '@lucide/svelte';

	const sidebar = useSidebar();
	const isOpen = $derived(sidebar.open);
</script>

<WiseButton variant="gradient" class=" h-fit w-full p-0" onclick={() => sidebar.toggle()}>
	<span class="flex w-full items-center gap-4 rounded-sm p-2 px-4 transition-all">
		<span class={cn(!isOpen ? 'translate-x-1.5' : 'translate-x-0')}>
			<User class="size-5 text-white" />
		</span>

		<span
			class={cn(
				'flex flex-col items-start ',
				isOpen ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'
			)}
		>
			{#await getUser()}
				<Loader2 class="animate-spin" />
			{:then value}
				<span class="truncate text-sm font-semibold text-white dark:text-white">
					{value.name || 'Người dùng'}
				</span>
				<span class="truncate text-xs text-white dark:text-gray-400">
					{value.email || 'Thông tin người dùng'}
				</span>
			{:catch error}
				<span class="text-sm font-medium text-red-600 dark:text-red-400">
					Lỗi: {error}
				</span>
			{/await}
		</span>
	</span>
</WiseButton>
