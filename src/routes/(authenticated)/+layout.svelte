<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { WiseBackground } from '@/lib/components/wise';
	import AppSidebar from '@/lib/components/svelte/sidebar/sidebar.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<WiseBackground>
		<AppSidebar />
		<page class="flex h-screen w-full overflow-hidden p-4">
			{@render children?.()}
		</page>
	</WiseBackground>
</Sidebar.Provider>
