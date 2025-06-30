import { api } from '@/lib/common/configs/api.config';
import type { Icon } from '@/lib/common/types/app.type';

export const ServiceIcon = {
	getIcon: async () => {
		return api.get<Icon[]>('GET /api/profile/icon');
	}
};
