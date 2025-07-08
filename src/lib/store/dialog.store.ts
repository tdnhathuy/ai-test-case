import type { Transaction } from '@/lib/common/types';
import { writable } from 'svelte/store';

type DialogTransaction = {
	open: boolean;
	transaction: Transaction | undefined;
	mode: 'create' | 'update';
};

export const storeDialogTransaction = writable<DialogTransaction>({
	open: false,
	transaction: undefined,
	mode: 'create'
});
