import { responseSuccess } from '@/lib/common/helpers';
import type { RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ locals, request, params }) => {
	return responseSuccess({ data: 'ok' });
};
