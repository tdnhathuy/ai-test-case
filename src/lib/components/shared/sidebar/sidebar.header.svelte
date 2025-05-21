<script lang="ts">
	import { Header } from '$lib/components/ui/sidebar/index.js';
	import type { Session } from '@auth/sveltekit';

	let { session } = $props<{ session: Session }>();
</script>

<Header class="">
	<span>{`Hello ${session.user.email}`}</span>
</Header>
