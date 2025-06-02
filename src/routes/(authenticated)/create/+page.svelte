<script lang="ts">
	import type { PromptCreate } from '$lib/types/app.type';

	import DescTestCase from './components/desc-test-case.svelte';

	let promptCreate: PromptCreate = $state({
		description: 'Test case for login feature'
	});
</script>

<section class="flex">
	<DescTestCase {promptCreate} />
</section>
