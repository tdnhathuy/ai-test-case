<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '@/lib/components/shared/sidebar/sidebar.svelte';

	let { children, data } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar session={data.session} />
	<main>
		<!-- <Sidebar.Trigger /> -->
		{@render children?.()}
	</main>
</Sidebar.Provider>
