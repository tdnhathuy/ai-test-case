import type { Category } from '@/lib/common/types/app.type';
import { api } from './api';
import { route } from '@/lib/ROUTES';

export const ServiceCategory = {
	getCategory: async () => {
		return api.get<Category[]>('GET /api/profile/category');
	},
	updateCategory: async (payload: PayloadUpdateCategory) => {
		const url = route('PATCH /api/profile/category/[id]', { id: payload.idCategory });
		await api.patch(url, payload);
	}
};

export interface PayloadUpdateCategory {
	idCategory: string;
	name: string;
}
