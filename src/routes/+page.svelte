<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '@/lib/components/svelte/sidebar/sidebar.svelte';
	import HomeLayout from '@/lib/layouts/home.layout.svelte';
	import HomePage from '@/modules/home/pages/home.page.svelte';
</script>

<HomeLayout>
	<HomePage />
</HomeLayout>
