import { api } from '@/lib/common/configs/api.config';
import type { Category } from '@/lib/common/types/app.type';
import { route } from '@/lib/ROUTES';

export const ServiceCategory = {
	getCategory: () => api.get<Category[]>('GET /api/profile/category'),
	updateCategory: async (payload: Category) => {
		const url = route('PATCH /api/profile/category/[id]', { id: payload.id });
		await api.patch(url, payload);
	},
	createCategory: async (payload: Category) => {
		const url = route('POST /api/profile/category');
		await api.post(url, payload);
	},
	deleteCategory: async (id: string) => {
		const url = route('DELETE /api/profile/category/[id]', { id });
		await api.del(url);
	}
};
