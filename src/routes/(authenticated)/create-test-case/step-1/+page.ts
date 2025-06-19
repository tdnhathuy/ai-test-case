import {
	createTestCaseStore,
	type CreateTestCaseData
} from '@/modules/create-test-case/stores/create-test-case.store';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';

export const load: PageLoad = () => {
	const store = get<CreateTestCaseData>(createTestCaseStore);
	return { store };
};
