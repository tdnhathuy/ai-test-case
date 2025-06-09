<script lang="ts">
	import { onMount } from 'svelte';
	import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
	import { goto } from '$app/navigation';
	import { route } from '@/lib/ROUTES';

	createTestCaseStore.reset();

	onMount(() => {
		createTestCaseStore.reset();
		goto(route('/create-test-case/step-1'));
	});
</script>
