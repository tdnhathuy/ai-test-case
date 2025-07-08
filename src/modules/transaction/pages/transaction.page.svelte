<script lang="ts">
	import { ListTrans, ListTransHeader } from '../components/list-trans';
</script>

<svelte:head>
	<title>Transaction</title>
	<meta name="description" content="Transaction 123" />
</svelte:head>

<section class="mx-auto flex h-full w-1/2 flex-col gap-4">
	<ListTransHeader />
	<ListTrans />
</section>
