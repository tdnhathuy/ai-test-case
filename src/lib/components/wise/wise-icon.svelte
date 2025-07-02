<script lang="ts">
	import type { Icon } from '@/lib/common/types';
	import { cn } from '@/lib/utils';

	interface IconProps {
		icon?: Icon;
		url?: string | null | undefined;
		class?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg';
		onclick?: () => void;
	}

	let { icon, url, size = 'md', class: className, onclick }: IconProps = $props();

	const urlIcon = $derived(icon?.url || url);

	const sizeMap = {
		xs: ' w-4 h-4',
		sm: ' w-6 h-6',
		md: ' w-10 h-10',
		lg: ' w-14 h-14'
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<img
	draggable={false}
	src={urlIcon}
	alt=""
	class={cn(sizeMap[size], onclick && 'cursor-pointer', className)}
	{onclick}
/>
