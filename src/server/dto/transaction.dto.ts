import type { Transaction } from '@/lib/common/types/app.type';
import type { IProfile } from '@/lib/common/zod/profile.zod';

export const DTOTransaction = {
	fromProfile: (profile: IProfile): Transaction[] => {
		return [];
	}
};
