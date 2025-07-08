import type { Transaction } from '@/lib/common/types';
import { writable } from 'svelte/store';

type DialogTransaction = {
	open: boolean;
	transaction: Transaction | undefined;
	isCreate: boolean;
};

export const storeDialogTransaction = writable<DialogTransaction>({
	open: false,
	transaction: undefined,
	isCreate: false
});
