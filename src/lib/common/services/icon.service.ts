import { api } from '@/lib/common/configs/api.config';
import type { Icon, IconCollection } from '@/lib/common/types/app.type';

export const ServiceIcon = {
	getIcon: async () => {
		return api.get<Icon[]>('GET /api/profile/icon');
	},
	createIconCollection: async (payload: PayloadCreateIconCollection) => {
		return api.post<IconCollection>('POST /api/icon/collection', payload);
	},
	getIconCollection: async () => {
		return api.get<IconCollection[]>('GET /api/icon/collection');
	}
};

export interface PayloadCreateIconCollection {
	name: string;
}
