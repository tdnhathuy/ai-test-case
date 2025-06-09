<script lang="ts">
	let { children } = $props();
</script>

<div class="flex flex-1">
	<div class="flex-1 p-6">
		{@render children?.()}
	</div>
</div>
