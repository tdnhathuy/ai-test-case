<script lang="ts">
	import type { Component } from 'svelte';
	import ButtonBase from '../button/button-base.svelte';
	import { useSidebar } from '@/lib/components/ui/sidebar';
	import { cn } from '@/lib/utils';
	interface Props {
		icon: Component;
		label: string;
		onclick?: () => void;
	}

	let { icon: Icon, label, onclick, ...restProps }: Props = $props();

	const sidebar = useSidebar();
	const isCollapsed = $derived(sidebar.state === 'collapsed');
</script>

<ButtonBase size="icon" class="w-full" {onclick} {...restProps}>
	<Icon />
	<span class={cn(isCollapsed && 'sr-only')}>{label}</span>
</ButtonBase>
