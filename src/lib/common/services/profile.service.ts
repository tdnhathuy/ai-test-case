import type { Profile } from '@/lib/common/types/app.type';
import { api } from './api';

export const ServiceProfile = {
	getProfile: async () => {
		return api.get<Profile>('GET /api/profile');
	},
	setupProfile: async (forceSetup: boolean) => {
		return api.get<Profile>('GET /api/profile/setup', { params: { forceSetup } });
	}
};
