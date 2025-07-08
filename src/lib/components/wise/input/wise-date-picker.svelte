<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import { dateValueToIso, formatDate, isoToDateValue } from '@/lib/common/helpers';
	import { type DateValue, getLocalTimeZone } from '@internationalized/date';
	import CalendarIcon from '@lucide/svelte/icons/calendar';

	type Props = {
		value?: string;
		class?: string;
	};

	let { value = $bindable(), class: className }: Props = $props();

	let contentRef = $state<HTMLElement | null>(null);

	let internalDate = $derived(value ? isoToDateValue(value) : undefined);

	const handleDateChange = (newDate: DateValue | undefined) => {
		if (newDate) {
			value = dateValueToIso(newDate);
		} else {
			value = undefined;
		}
	};
</script>

<Popover.Root>
	<Popover.Trigger
		class={cn(
			buttonVariants({
				variant: 'outline',
				class: 'w-full justify-start text-left font-normal '
			}),
			className
		)}
	>
		<CalendarIcon />
		{internalDate ? formatDate(internalDate.toDate(getLocalTimeZone())) : 'Pick a date'}
	</Popover.Trigger>
	<Popover.Content bind:ref={contentRef} class="w-auto p-0">
		<Calendar type="single" bind:value={internalDate} onValueChange={handleDateChange} />
	</Popover.Content>
</Popover.Root>
