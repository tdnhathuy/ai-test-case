import { parseDate, type DateValue } from '@internationalized/date';
import dayjs from 'dayjs';

export const formatDate = (date: Date | string) => {
	return new Date(date).toLocaleDateString('vi-VN', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});
};

// Helper functions for date conversion
export const isoToDateValue = (isoString: string): DateValue => {
	return parseDate(dayjs(isoString).format('YYYY-MM-DD'));
};

export const dateValueToIso = (dateValue: DateValue): string => {
	return dayjs(dateValue.toString()).toISOString();
};
