<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import ButtonBase from '../button/button-base.svelte';
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

	<ButtonBase size="icon" onclick={() => sidebar.toggle()} class="absolute -right-4 bottom-12 z-10">
		{#if isCollapsed}
			<ChevronRight />
		{:else}
			<ChevronLeft />
		{/if}
	</ButtonBase>
</Sidebar.Root>
