<script lang="ts">
	import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover';

	import { useGetListIcon } from '@/lib/common/services/mutations/app.query';
	import type { Icon } from '@/lib/common/types/app.type';
	import { WiseIcon } from '@/lib/components/wise';
	let ref: HTMLButtonElement | null = $state(null);

	type Props = {
		icon: Icon | null;
	};

	let { icon = $bindable() }: Props = $props();

	const query = useGetListIcon();

	const icons = $derived($query.data || []);
	console.log('icons', icons);

	$effect(() => {
		if (!icon && icons) {
			icon = icons[0];
		}
	});
</script>

<Popover>
	<PopoverTrigger class="flex-shrink-0 cursor-pointer">
		<WiseIcon url={icon?.url ?? icons?.[0]?.url ?? ''} size={'md'} />
	</PopoverTrigger>

	<PopoverContent class="flex p-0">
		<div class="grid grid-cols-6 gap-2 p-2">
			{#each icons as iconItem}
				<WiseIcon
					url={iconItem.url}
					size={'md'}
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
