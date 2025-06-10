import { handle as handleAuth } from './auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import type { HandleServerError } from '@sveltejs/kit';

// 🔒 Directory-based protection using AuthJS
const authorizationHandle: Handle = async ({ event, resolve }) => {
	// Handle Chrome DevTools manifest requests
	if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools')) {
		return new Response(null, { status: 204 });
	}

	// Get root directory name from route
	const rootDirName = event.route.id?.split('/')[1] || '';
	
	// Protected directories
	const protectedDirs = ['(authenticated)', '(admin)', '(protected)'];
	
	// Check if current route is in protected directory
	const isProtectedRoute = protectedDirs.includes(rootDirName);
	
	if (isProtectedRoute) {
		console.log(`🔒 Checking auth for protected route: ${event.url.pathname}`);
		
		// Use AuthJS session verification
		const session = await event.locals.auth();
		
		if (!session?.user) {
			console.log('❌ No valid session - redirecting to auth');
			throw redirect(303, '/auth');
		}
		
		// Optional: Role-based protection  
		if (rootDirName === '(admin)') {
			// Add role check logic here if needed
			// Example: check session.user.email for admin domain
			const isAdmin = session.user.email?.endsWith('@admin.com') || false;
			if (!isAdmin) {
				console.log('❌ Insufficient permissions');
				throw redirect(303, '/auth?error=insufficient_permissions');
			}
		}
		
		console.log('✅ Auth check passed for:', session.user.email);
	}

	return resolve(event);
}

// Combine AuthJS authentication with custom authorization  
export const handle: Handle = sequence(handleAuth, authorizationHandle);

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
