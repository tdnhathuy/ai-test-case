import { QueryClient } from '@tanstack/svelte-query';

export const createQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 5 * 60 * 1000, // 5 phút
				refetchOnWindowFocus: false,
				retry: 2,
				retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
			},
			mutations: {
				retry: 1,
				retryDelay: 1000,
			},
		},
	});
}; 