import { api } from '@/lib/common/services/client';
import type { Category } from '@/lib/common/types/app.type';

export const load = async (): Promise<CategoryPageProps> => {
	const category = await api.get<Category[]>('GET /api/profile/category');

	return {
		category: category || []
	};
};

export interface CategoryPageProps {
	category: Category[];
}
