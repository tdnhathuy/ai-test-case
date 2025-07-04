<script lang="ts">
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { isoToDateValue, dateValueToIso, formatDate } from '@/lib/common/helpers';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	type Props = {
		value?: string;
	};

	let { value = $bindable() }: Props = $props();

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
				class: 'w-[280px] justify-start text-left font-normal'
			}),
			!internalDate && 'text-muted-foreground'
		)}
	>
		<CalendarIcon />
		<!-- {internalDate ? df.format(internalDate.toDate(getLocalTimeZone())) : 'Pick a date'} -->
		{internalDate ? formatDate(internalDate.toDate(getLocalTimeZone())) : 'Pick a date'}
	</Popover.Trigger>
	<Popover.Content bind:ref={contentRef} class="w-auto p-0">
		<Calendar type="single" bind:value={internalDate} onValueChange={handleDateChange} />
	</Popover.Content>
</Popover.Root>
