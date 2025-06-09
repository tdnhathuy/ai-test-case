<script lang="ts">
	let { children } = $props();
</script>

<div class="mx-auto flex max-w-xl min-w-xl flex-col gap-4 ">
	{@render children?.()}
</div>
