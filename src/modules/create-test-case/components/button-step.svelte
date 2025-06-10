<script lang="ts">
	import Button from '@/lib/components/ui/button/button.svelte';

	interface Props {
		title?: string;
		onClick?: () => void;
		disabled?: boolean;
		isLoading?: boolean;
	}
	let { title = 'string', onClick, disabled, isLoading }: Props = $props();
</script>

<Button onclick={onClick} disabled={disabled || isLoading} class="w-fit self-end">{title}</Button>
