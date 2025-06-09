<script lang="ts">
	import { Header } from '$lib/components/ui/sidebar/index.js';
	import Button from '@/lib/components/ui/button/button.svelte';
	import { route } from '@/lib/ROUTES';
	import { Home, Plus } from '@lucide/svelte';
</script>

<Header class="">
	<a href={route('/')}>
		<Button size="icon" class="w-full">
			<Home class="h-4 w-4" />
			<span>Home</span>
		</Button>
	</a>

	<a href={route('/create-test-case')}>
		<Button size="icon" class="w-full">
			<Plus class="h-4 w-4" />
			<span> Tạo mới </span>
		</Button>
	</a>
</Header>
