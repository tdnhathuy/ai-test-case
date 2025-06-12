import type { ComponentType } from 'svelte';

export interface EnhancedProps {
	label?: string;
	error?: string;
	helperText?: string;
	required?: boolean;
	variant?: 'default' | 'bordered' | 'ghost';
	size?: 'sm' | 'default' | 'lg';
}

/**
 * HOC-like function để tạo enhanced version của component
 */
export function createEnhancedComponent<T extends Record<string, any>>(
	OriginalComponent: ComponentType,
	defaultEnhancements: Partial<EnhancedProps> = {}
) {
	return class EnhancedComponent {
		constructor(props: T & EnhancedProps) {
			// Logic để merge props và return enhanced component
			// Trong Svelte, pattern này hơi khác vì không có class components
			// Thay vào đó chúng ta return một config object
			return {
				component: OriginalComponent,
				enhancedProps: { ...defaultEnhancements, ...props }
			};
		}
	};
}

/**
 * Factory function để tạo preset enhanced components
 */
export function createComponentFactory() {
	return {
		// Textarea variants
		createTextarea: (props: any = {}) => ({
			component: 'Textarea', // Component name or import
			props: {
				variant: 'default',
				size: 'default',
				...props
			}
		}),

		// Input variants  
		createInput: (props: any = {}) => ({
			component: 'Input',
			props: {
				variant: 'default',
				size: 'default',
				...props
			}
		}),

		// Button variants
		createButton: (props: any = {}) => ({
			component: 'Button',
			props: {
				variant: 'default',
				size: 'default',
				...props
			}
		})
	};
}

export const ComponentFactory = createComponentFactory(); 