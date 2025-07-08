import type { PayloadGetTrans } from '@/lib/common/services/trans.service';
import { writable } from 'svelte/store';

interface State {
	getTransaction: PayloadGetTrans;
}

export const storeFilterAPI = writable<State>({
	getTransaction: {
		unclassified: false
	}
});
