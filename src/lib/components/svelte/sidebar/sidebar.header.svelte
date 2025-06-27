<script lang="ts">
	import { Header } from '$lib/components/ui/sidebar/index.js';
	import SidebarButton from '@/lib/components/svelte/sidebar/sidebar-button.svelte';
	import { route } from '@/lib/ROUTES';
	import { client } from '@/lib/common/services/client';
	import { Home, LayoutGrid, LayoutList, Plus, User } from '@lucide/svelte';
</script>

<Header class="">
	<a href={route('/')}>
		<SidebarButton icon={Home} label="Home" />
	</a>

	<!-- <a href={route('/create-test-case')}>
		<SidebarButton icon={Plus} label="Tạo mới" />
	</a> -->

	<a href={route('/transaction')}>
		<SidebarButton icon={LayoutList} label="Transaction" />
	</a>

	<a href={route('/category')}>
		<SidebarButton icon={LayoutGrid} label="Category" />
	</a>

	<SidebarButton
		icon={User}
		label="Setup profile"
		onclick={async () => {
			const response = await client.get(route('GET /api/profile/setup'), {
				params: { forceSetup: true }
			});
			console.log('response', response);
		}}
	/>

	<SidebarButton
		icon={User}
		label="Get category"
		onclick={async () => {
			client.get(route('GET /api/profile/category'));
		}}
	/>
</Header>
