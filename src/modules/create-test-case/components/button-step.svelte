<script lang="ts">
	import ButtonBase from '@/lib/components/svelte/button/button-base.svelte';

	interface Props {
		title?: string;
		onClick?: () => void;
		disabled?: boolean;
		isLoading?: boolean;
	}
	let { title = 'string', onClick, disabled, isLoading }: Props = $props();
</script>

<ButtonBase
	onclick={onClick}
	disabled={disabled || isLoading}
	class="w-20 min-w-20 self-end"
	loading={isLoading}
>
	{title}
</ButtonBase>
