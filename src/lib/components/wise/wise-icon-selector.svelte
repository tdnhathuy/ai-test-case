<script lang="ts">
	import { QueryKeys } from '@/lib/common/constant/key.const';
	import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover';

	import { ServiceIcon } from '@/lib/common/services';
	import type { Icon } from '@/lib/common/types/app.type';
	import { createQuery } from '@tanstack/svelte-query';
	import { WiseIcon } from '@/lib/components/wise';

	let ref: HTMLButtonElement | null = $state(null);

	type Props = {
		icon?: Icon;
	};

	let { icon = $bindable() }: Props = $props();

	const queryIcon = createQuery({
		queryKey: [QueryKeys.getIcon],
		queryFn: ServiceIcon.getIcon
	});

	const icons = $derived($queryIcon.data || []);

	$effect(() => {
		if (!icon && icons) {
			icon = icons[0];
		}
	});
</script>

<Popover>
	<PopoverTrigger class="cursor-pointer">
		<WiseIcon url={icon?.url ?? icons?.[0]?.url ?? ''} size={'lg'} />
	</PopoverTrigger>

	<PopoverContent class="flex flex-col gap-2">
		<div class=" flex w-16 gap-2">
			{#each icons as iconItem}
				<WiseIcon
					url={iconItem.url}
					size={'lg'}
					onclick={() => {
						icon = iconItem;
						ref?.click();
					}}
				/>
			{/each}
		</div>
	</PopoverContent>

	<PopoverClose bind:ref class="hidden" />
</Popover>
