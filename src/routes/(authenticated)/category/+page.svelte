<script lang="ts">
	import type { PageProps } from './+page';

	let { data }: { data: PageProps } = $props();
	console.log('data', data);
</script>

<h1>Category</h1>

<pre>{JSON.stringify(data.category, null, 2)}</pre>
