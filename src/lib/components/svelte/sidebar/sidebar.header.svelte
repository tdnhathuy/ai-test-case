<script lang="ts">
	import { Header } from '$lib/components/ui/sidebar/index.js';
	import { ServiceCategory } from '@/lib/common/services/category.service';
	import { ServiceIcon } from '@/lib/common/services/icon.service';
	import { ServiceProfile } from '@/lib/common/services/profile.service';
	import SidebarButton from '@/lib/components/svelte/sidebar/sidebar-button.svelte';
	import { route } from '@/lib/ROUTES';
	import { Home, LayoutGrid, LayoutList, User } from '@lucide/svelte';
</script>

<Header class="">
	<a href={route('/')}>
		<SidebarButton icon={Home} label="Home" />
	</a>

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
			await ServiceProfile.setupProfile(true);
		}}
	/>

	<SidebarButton
		icon={User}
		label="Get category"
		onclick={async () => {
			await ServiceCategory.getCategory();
		}}
	/>

	<SidebarButton
		icon={User}
		label="Get Icon"
		onclick={async () => {
			await ServiceIcon.getIcon();
		}}
	/>
</Header>
