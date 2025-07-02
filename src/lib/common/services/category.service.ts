import { api } from '@/lib/common/configs/api.config';
import type { Category } from '@/lib/common/types/app.type';
import { route } from '@/lib/ROUTES';

export const ServiceCategory = {
	getCategory: () => api.get<Category[]>('GET /api/profile/category'),
	updateCategory: async (payload: PayloadUpdateCategory) => {
		const url = route('PATCH /api/profile/category/[id]', { id: payload.category.id });
		await api.patch(url, payload);
	}
};

export interface PayloadUpdateCategory {
	category: Category;
}
