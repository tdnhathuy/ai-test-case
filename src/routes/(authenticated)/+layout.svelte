<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '@/lib/components/svelte/sidebar/sidebar.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="flex h-screen flex-1 flex-col overflow-hidden">
		<div class="flex-1 overflow-auto p-4">
			{@render children?.()}
		</div>
	</main>
</Sidebar.Provider>
