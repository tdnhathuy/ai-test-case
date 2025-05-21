<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { Session } from '@auth/sveltekit';
	import SidebarFooter from './sidebar.footer.svelte';
	import SidebarHeader from './sidebar.header.svelte';

	let { session } = $props<{ session: Session }>();
</script>

<Sidebar.Root>
	<SidebarHeader {session} />

	<Sidebar.Content>
		<Sidebar.Group />
		<Sidebar.Group />
	</Sidebar.Content>

	<SidebarFooter />
</Sidebar.Root>
