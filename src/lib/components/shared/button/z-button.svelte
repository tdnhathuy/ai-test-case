<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { ButtonProps } from '$lib/components/ui/button/button.svelte';

	let {
		children,
		variant = "default",
		size = "default",
		disabled = false,
		href = undefined,
		type = "button",
		class: className = "",
		...restProps
	}: ButtonProps = $props();
</script>

<Button
	variant={variant}
	size={size}
	disabled={disabled}
	href={href}
	type={type}
	class={className}
	{...restProps}
>
	{@render children?.()}
</Button>
