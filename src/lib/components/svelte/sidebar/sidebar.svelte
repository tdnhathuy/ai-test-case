<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import WiseButton from '@/lib/components/wise/button/wise-button.svelte';
	import { cn } from '@/lib/utils';
	import { ChevronLeft } from '@lucide/svelte';
	import SidebarFooter from './sidebar.footer.svelte';
	import SidebarHeader from './sidebar.header.svelte';

	const sidebar = Sidebar.useSidebar();
	const isCollapsed = $derived(sidebar.state === 'collapsed');
</script>

<Sidebar.Root collapsible="icon">
	<SidebarHeader />

	<Sidebar.Content>
		<Sidebar.Group />
		<Sidebar.Group />
	</Sidebar.Content>

	<SidebarFooter />

	<WiseButton
		size="icon"
		variant="ghost"
		onclick={() => sidebar.toggle()}
		class={cn(
			'absolute -right-4 bottom-12 z-10 rounded-full',
			'bg-white transition-transform',
			isCollapsed ? 'rotate-180' : 'rotate-0'
		)}
	>
		<ChevronLeft />
	</WiseButton>
</Sidebar.Root>
