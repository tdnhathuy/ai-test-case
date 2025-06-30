<script lang="ts">
	import { cn } from '@/lib/utils';

	interface IconProps {
		url: string;
		class?: string;
		size?: 'sm' | 'md' | 'lg';
		onclick?: () => void;
	}

	let { url, size = 'md', class: className, onclick }: IconProps = $props();

	const sizeMap = {
		sm: 'size-6',
		md: 'size-10',
		lg: 'size-14'
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<img
	draggable={false}
	src={url}
	alt=""
	class={cn(sizeMap[size], onclick && 'cursor-pointer', className)}
	{onclick}
/>
