<script lang="ts">
	import { queryClient } from '@/lib/common/configs/query-client.config';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.css';

	let { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
	<main class="flex flex-1">
		{@render children?.()}
	</main>
</QueryClientProvider>
