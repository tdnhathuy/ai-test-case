<script>
	import { Footer } from '$lib/components/ui/sidebar/index.js';
	import { signOut } from '@auth/sveltekit/client';
	import ButtonBase from '../../svelte/button/button-base.svelte';
</script>

<Footer>
	<ButtonBase onclick={() => signOut({ redirectTo: '/' })} size="lg">
		<span>Đăng xuất</span>
	</ButtonBase>
</Footer>
