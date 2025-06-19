<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import SidebarFooter from './sidebar.footer.svelte';
	import SidebarHeader from './sidebar.header.svelte';
</script>

<Sidebar.Root>
	<SidebarHeader />

	<Sidebar.Content>
		<Sidebar.Group />
		<Sidebar.Group />
	</Sidebar.Content>

	<SidebarFooter />
</Sidebar.Root>
