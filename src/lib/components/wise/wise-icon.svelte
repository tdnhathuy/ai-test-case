<script lang="ts">
	import { CDNIcon } from '@/lib/common/configs/cdn.config';
	import type { Icon } from '@/lib/common/types';
	import { cn } from '@/lib/utils';
	import { Loader } from '@lucide/svelte';

	interface IconProps {
		icon?: Icon | null;
		url?: string | null;
		class?: string;
		size?: 'xs' | 'sm' | 'md' | 'lg';
		onclick?: () => void;
		defaultIcon?: boolean;
	}

	let { icon, url, size = 'md', class: className, onclick }: IconProps = $props();

	const urlIcon = $derived(icon?.url || url || CDNIcon.img_crash);

	const sizeMap = {
		xs: ' w-4 h-4',
		sm: ' w-6 h-6',
		md: ' w-10 h-10',
		lg: ' w-14 h-14'
	};
</script>

{#if !urlIcon}
	<Loader class="animate-spin" />
{:else}
	<img
		draggable={false}
		src={urlIcon}
		alt=""
		class={cn(sizeMap[size], onclick && 'cursor-pointer', className)}
		{onclick}
	/>
{/if}
