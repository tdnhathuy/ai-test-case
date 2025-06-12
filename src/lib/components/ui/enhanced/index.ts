import EnhancedField from './enhanced-field.svelte';
import Textarea from '../textarea/textarea.svelte';
import Input from '../input/input.svelte';
import Button from '../button/button.svelte';

// Shorthand helpers
export const EnhancedTextarea = (props: any) => ({
	component: Textarea,
	...props
});

export const EnhancedInput = (props: any) => ({
	component: Input,
	...props
});

export const EnhancedButton = (props: any) => ({
	component: Button,
	...props
});

export { EnhancedField };

// Re-export originals for flexibility
export { 
	Textarea as OriginalTextarea,
	Input as OriginalInput,
	Button as OriginalButton
}; 