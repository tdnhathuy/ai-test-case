<script>
	import { Footer } from '$lib/components/ui/sidebar/index.js';
	import { signOut } from '@auth/sveltekit/client';
	import { LogOut } from '@lucide/svelte';
	import SidebarButton from './sidebar-button.svelte';
</script>

<Footer>
	<SidebarButton icon={LogOut} label="Đăng xuất" onclick={() => signOut({ redirectTo: '/' })} />
</Footer>
