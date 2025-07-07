<script>
	import { Footer } from '$lib/components/ui/sidebar/index.js';
	import LogoutDialog from '@/lib/components/logout.dialog.svelte';
	import { LogOut } from '@lucide/svelte';
	import { Dialog, DialogTrigger } from '../../ui/dialog';
	import SidebarButton from './sidebar-button.svelte';
</script>

<Footer>
	<Dialog>
		<DialogTrigger>
			<SidebarButton icon={LogOut} label="Đăng xuất" />
		</DialogTrigger>

		<LogoutDialog />
	</Dialog>
</Footer>
