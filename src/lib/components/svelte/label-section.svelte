<script lang="ts">
	import type { Snippet } from 'svelte';

	let { label, children }: { label: string; children: Snippet } = $props();
</script>

<section class="flex flex-col gap-2">
	<h1>{label}</h1>
	{@render children()}
</section>
