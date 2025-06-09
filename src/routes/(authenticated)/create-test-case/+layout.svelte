<script lang="ts">
	let { children } = $props();
</script>

<div class="flex flex-1 justify-center p-6">
	<div class="flex-1">
		{@render children?.()}
	</div>
</div>
