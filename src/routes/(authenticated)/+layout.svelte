<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '@/lib/components/svelte/sidebar/sidebar.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<main class="flex h-screen w-full overflow-hidden">
		<AppSidebar />
		<page class="flex h-screen w-full overflow-hidden p-4">
			{@render children?.()}
		</page>
	</main>
</Sidebar.Provider>
