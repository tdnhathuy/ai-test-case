<script lang="ts">
	import { QueryKeys } from '@/lib/common/constant/key.const';
	import { ServiceIcon } from '@/lib/common/services/icon.service';
	import Icon from '@/lib/components/svelte/icon.svelte';
	import type { Icon as IconType } from '@/lib/common/types/app.type';
	import PopoverContent from '@/lib/components/ui/popover/popover-content.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { PopoverClose } from '@/lib/components/ui/popover';

	interface IconSelectPopoverProps {
		onSelect: (icon: IconType) => void;
	}

	const { onSelect }: IconSelectPopoverProps = $props();
	const query = createQuery({
		queryKey: [QueryKeys.getIcon],
		queryFn: ServiceIcon.getIcon
	});

	const icons = $derived($query.data || []);

	let hiddenCloseBtn: HTMLButtonElement | null = $state(null);
</script>

<PopoverContent class="flex flex-col gap-2">
	<div class=" flex w-16 gap-2">
		{#each icons as icon}
			<Icon
				url={icon.url}
				size={'lg'}
				onclick={() => {
					onSelect(icon);
					hiddenCloseBtn?.click();
				}}
			/>
		{/each}
	</div>
</PopoverContent>

<PopoverClose bind:ref={hiddenCloseBtn} class="hidden" />
