<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	export let data;
	console.log('session', data.session);
</script>

<nav>
	<div class="actions">
		<div class="wrapper-form">
			{#if data.session}
				<p>Xin chào {data.session.user.name}</p>
				<button on:click={signOut}>Đăng xuất</button>
			{:else}
				<button on:click={() => signIn('google')}>Đăng nhập với Google</button>
			{/if}
		</div>
	</div>
</nav>
