<script lang="ts">
	let { children } = $props();
</script>

<main class="flex w-full flex-1 flex-col gap-4 p-2">
	{@render children?.()}
</main>
