<script lang="ts">
	let { children } = $props();
</script>

<div class="mx-auto flex w-3xl min-w-lg flex-col gap-4">
	{@render children?.()}
</div>
