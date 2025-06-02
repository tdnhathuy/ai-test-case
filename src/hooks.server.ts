export { handle } from './auth';

// import { handle as handleAuth } from './auth';
// import type { Handle } from '@sveltejs/kit';

// export const handle: Handle = async ({ event, resolve }) => {
// 	if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools')) {
// 		return new Response(null, { status: 204 }); // Return empty response with 204 No Content
// 	}

// 	return handleAuth(event);
// };

import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = ({ error, event }) => {
	// Bỏ qua lỗi Chrome DevTools manifest
	if (event.url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
		return {
			message: 'Chrome DevTools manifest not available'
		};
	}

	console.error('Server error:', error);
	
	return {
		message: 'Internal error occurred'
	};
};
