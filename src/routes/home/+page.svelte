<script>
	import { signOut } from '@auth/sveltekit/client';
</script>

<div>
	<h1>Home</h1>
	<button on:click={() => signOut({ redirectTo: '/' })}>Đăng xuất</button>
</div>
