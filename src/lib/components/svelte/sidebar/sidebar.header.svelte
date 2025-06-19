<script lang="ts">
	import { Header } from '$lib/components/ui/sidebar/index.js';
	import SidebarButton from '@/lib/components/svelte/sidebar/sidebar-button.svelte';
	import { route } from '@/lib/ROUTES';
	import { Home, Plus } from '@lucide/svelte';
</script>

<Header class="">
	<a href={route('/')}>
		<SidebarButton icon={Home} label="Home" />
	</a>

	<a href={route('/create-test-case')}>
		<SidebarButton icon={Plus} label="Tạo mới" />
	</a>
</Header>
