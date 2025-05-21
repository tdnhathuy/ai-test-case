<script>
	import { Footer } from '$lib/components/ui/sidebar/index.js';
	import { signOut } from '@auth/sveltekit/client';
	import ZButton from '../button/z-button.svelte';
</script>

<Footer class="">
	<ZButton class="" onclick={() => signOut({ redirectTo: '/' })} size="lg">
		<span>Đăng xuất</span>
	</ZButton>
</Footer>
