<script lang="ts">
	import { cn } from '@/lib/utils';

	interface IconProps {
		url: string;
		class?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	let { url, size = 'md', class: className }: IconProps = $props();

	const sizeMap = {
		sm: 'size-6',
		md: 'size-10',
		lg: 'size-14'
	};
</script>

<img draggable={false} src={url} alt="" class={cn(sizeMap[size], className)} />
