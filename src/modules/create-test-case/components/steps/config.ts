import { Info, LaptopMinimalCheck, ListCheck } from '@lucide/svelte';

export const configSteps = [
	{
		step: 1,
		title: 'Basic Information',
		icon: Info
	},
	{
		step: 2,
		title: 'Requirements',
		icon: ListCheck
	},
	{
		step: 3,
		title: 'Review',
		icon: LaptopMinimalCheck
	}
];
