import type { Icon } from '@/lib/common/types/app.type';
import { api } from './api';

export const ServiceIcon = {
	getIcon: async () => {
		return api.get<Icon[]>('GET /api/profile/icon');
	}
};
