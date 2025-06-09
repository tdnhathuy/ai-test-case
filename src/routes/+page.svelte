<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '@/lib/components/shared/sidebar/sidebar.svelte';
	import HomeLayout from '@/lib/layouts/home.layout.svelte';
	import HomePage from '@/modules/home/pages/home.page.svelte';

	let { data } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar session={data.session} />
	<HomeLayout>
		<HomePage />
	</HomeLayout>
</Sidebar.Provider>
