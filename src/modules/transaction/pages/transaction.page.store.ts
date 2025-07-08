import type { Transaction } from '@/lib/common/types';
import { writable } from 'svelte/store';

interface State {
	listTransaction: Transaction[];
}

export const storeTransactionPage = writable<State>({
	listTransaction: []
});
