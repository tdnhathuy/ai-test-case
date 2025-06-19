<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '@/lib/components/svelte/sidebar/sidebar.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="flex flex-1">
		{@render children?.()}
	</main>
</Sidebar.Provider>
