<script lang="ts">
	import { cn } from '@/lib/utils';
	type Props = {
		children: any;
		className?: string;
		onClick?: () => void;
	};
	const { children, className, onClick }: Props = $props();

	const classesTW = cn(
		'flex h-48 w-40 flex-col gap-2 rounded-lg bg-white p-2',
		'shadow-md',
		onClick && 'cursor-pointer',
		className
	);
</script>

{#if onClick}
	<button type="button" class={classesTW} onclick={onClick}>
		{@render children()}
	</button>
{:else}
	<div class={classesTW}>
		{@render children()}
	</div>
{/if}
