<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.css';

	let { children } = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 5 * 60 * 1000,
				refetchOnWindowFocus: false
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<main class="flex flex-1">
		{@render children?.()}
	</main>
</QueryClientProvider>
