import { route } from '@/lib/ROUTES';
import { client } from '@/lib/services/client';

export const AuthService = {
	verifyToken: async () => {
		const response = await client.get(route('GET /api/auth/verify-token'));
		return response.data;
	}
};
