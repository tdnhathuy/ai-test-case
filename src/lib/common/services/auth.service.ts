import { api } from '@/lib/common/configs/api.config';
import { route } from '@/lib/ROUTES';

export const AuthService = {
	verifyToken: async () => {
		return api.get(route('GET /api/auth/verify-token'));
	}
};
