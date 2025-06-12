<script lang="ts">
	import Textarea from '../textarea/textarea.svelte';
	import { cn, type WithElementRef, type WithoutChildren } from "$lib/utils.js";
	import type { HTMLTextareaAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		placeholder = "",
		disabled = false,
		readonly = false,
		rows = 3,
		// Custom props cho component của bạn
		variant = "default", // "default" | "bordered" | "ghost"
		size = "default", // "sm" | "default" | "lg"
		label,
		error,
		helperText,
		required = false,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> & {
		variant?: "default" | "bordered" | "ghost";
		size?: "sm" | "default" | "lg";
		label?: string;
		error?: string;
		helperText?: string;
		required?: boolean;
	} = $props();

	// Custom styling based on variant and size
	const getCustomClasses = () => {
		const variants = {
			default: "",
			bordered: "border-2 border-primary/20 focus-visible:border-primary",
			ghost: "border-0 bg-muted/50 focus-visible:bg-muted/70"
		};

		const sizes = {
			sm: "min-h-12 px-2 py-1 text-sm",
			default: "min-h-16 px-3 py-2",
			lg: "min-h-20 px-4 py-3 text-lg"
		};

		return cn(
			variants[variant],
			sizes[size],
			error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
			className
		);
	};
</script>

<div class="space-y-2">
	{#if label}
		<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
			{label}
			{#if required}
				<span class="text-destructive">*</span>
			{/if}
		</label>
	{/if}

	<Textarea
		bind:ref
		bind:value
		class={getCustomClasses()}
		{placeholder}
		{disabled}
		{readonly}
		{rows}
		aria-invalid={!!error}
		aria-describedby={error ? "error-message" : helperText ? "helper-text" : undefined}
		{...restProps}
	/>

	{#if error}
		<p id="error-message" class="text-sm text-destructive">
			{error}
		</p>
	{:else if helperText}
		<p id="helper-text" class="text-sm text-muted-foreground">
			{helperText}
		</p>
	{/if}
</div> 