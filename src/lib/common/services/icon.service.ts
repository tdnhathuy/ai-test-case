import type Icon from '@/lib/components/svelte/icon.svelte';
import { api } from './api';

export const ServiceIcon = {
	getIcon: async () => {
		return api.get<Icon[]>('GET /api/profile/icon');
	}
};
