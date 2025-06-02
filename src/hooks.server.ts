export { handle } from './auth';

// import { handle as handleAuth } from './auth';
// import type { Handle } from '@sveltejs/kit';

// export const handle: Handle = async ({ event, resolve }) => {
// 	if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools')) {
// 		return new Response(null, { status: 204 }); // Return empty response with 204 No Content
// 	}

// 	return handleAuth(event);
// };
