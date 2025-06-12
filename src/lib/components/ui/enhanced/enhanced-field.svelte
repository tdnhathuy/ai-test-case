<script lang="ts" generics="T extends Record<string, any>">
	import { cn } from '$lib/utils.js';

	let {
		// Generic component props
		component,
		componentProps = {} as T,

		// Enhanced features
		label,
		error,
		helperText,
		required = false,
		variant = 'default',
		size = 'default',
		class: className,

		// Bindings
		value = $bindable(),
		ref = $bindable(null),

		...restProps
	}: {
		component: any; // The original component to wrap
		componentProps?: T;
		label?: string;
		error?: string;
		helperText?: string;
		required?: boolean;
		variant?: 'default' | 'bordered' | 'ghost';
		size?: 'sm' | 'default' | 'lg';
		class?: string;
		value?: any;
		ref?: any;
	} & T = $props();

	// Enhanced styling based on variant and size
	const getEnhancedClasses = () => {
		const variants = {
			default: '',
			bordered: 'border-2 border-primary/20 focus-visible:border-primary',
			ghost: 'border-0 bg-muted/50 focus-visible:bg-muted/70'
		};

		const sizes = {
			sm: 'text-sm',
			default: '',
			lg: 'text-lg'
		};

		return cn(
			variants[variant],
			sizes[size],
			error &&
				'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
			className
		);
	};

	// Generate unique ID for label association
	const fieldId = `field-${Math.random().toString(36).substr(2, 9)}`;

	// Merge component props with enhanced styling
	const finalProps = {
		...componentProps,
		...restProps,
		id: fieldId,
		class: getEnhancedClasses(),
		'aria-invalid': !!error,
		'aria-describedby': error ? 'error-message' : helperText ? 'helper-text' : undefined
	};
</script>

<div class="space-y-2">
	{#if label}
		<label
			for={fieldId}
			class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			{label}
			{#if required}
				<span class="text-destructive">*</span>
			{/if}
		</label>
	{/if}

	{#if component}
		{@const Component = component}
		<Component bind:value bind:ref {...finalProps} />
	{/if}

	{#if error}
		<p id="error-message" class="text-destructive text-sm">
			{error}
		</p>
	{:else if helperText}
		<p id="helper-text" class="text-muted-foreground text-sm">
			{helperText}
		</p>
	{/if}
</div>
