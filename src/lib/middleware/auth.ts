import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

// Hàm helper để parse cookie
function parseCookies(cookieHeader: string | null): Record<string, string> {
	const cookies: Record<string, string> = {};

	if (!cookieHeader) return cookies;

	cookieHeader.split(';').forEach((cookie) => {
		const [name, ...rest] = cookie.trim().split('=');
		if (name && rest.length > 0) {
			cookies[name] = decodeURIComponent(rest.join('='));
		}
	});

	return cookies;
}

// Hàm để lấy NextAuth session token từ cookies
function getNextAuthTokenFromCookies(cookies: Record<string, string>): string | null {
	// Thử lấy từ authjs.session-token trước
	if (cookies['authjs.session-token']) {
		return cookies['authjs.session-token'];
	}

	// Nếu không có, thử ghép từ next-auth.session-token.0 và next-auth.session-token.1
	const token0 = cookies['next-auth.session-token.0'];
	const token1 = cookies['next-auth.session-token.1'];

	if (token0 && token1) {
		return token0 + token1;
	}

	// Thử lấy từ next-auth.session-token (single token)
	if (cookies['next-auth.session-token']) {
		return cookies['next-auth.session-token'];
	}

	return null;
}

// 🔓 WHITELIST: Danh sách routes KHÔNG cần auth (customize tại đây)
const UNPROTECTED_ROUTES = [
	// NextAuth routes
	'/api/auth/signin',
	'/api/auth/signout',
	'/api/auth/callback',
	'/api/auth/csrf',
	'/api/auth/session',
	'/api/auth/providers',

	// Public API routes (thêm routes không cần auth vào đây)
	'/api/public',
	'/api/health',
	'/api/version'
	// '/api/auth/verify-token'

];

// 🔒 Simple sync middleware - chỉ check cơ bản
export function checkAuthMiddleware(event: RequestEvent): Response | null {
	const { url, request } = event;

	// Chỉ check cho API routes
	if (!url.pathname.startsWith('/api/')) {
		return null;
	}

	// Skip unprotected routes
	const isUnprotected = UNPROTECTED_ROUTES.some((route) => url.pathname.startsWith(route));
	if (isUnprotected) {
		return null;
	}

	// Check có session token không (basic check)
	const cookieHeader = request.headers.get('cookie');
	const cookies = parseCookies(cookieHeader);
	const sessionToken = getNextAuthTokenFromCookies(cookies);

	if (!sessionToken) {
		return json(
			{
				error: 'Unauthorized',
				message: 'No session token found. Please login first.',
				code: 'NO_SESSION_TOKEN',
				loginUrl: '/auth'
			},
			{ status: 401 }
		);
	}

	// Basic format check
	if (sessionToken.split('.').length !== 5) {
		return json(
			{
				error: 'Unauthorized', 
				message: 'Invalid session token format',
				code: 'INVALID_SESSION_TOKEN',
				loginUrl: '/auth'
			},
			{ status: 401 }
		);
	}

	return null; // Continue - detailed verification trong requireAuth
}

// 🔍 Full session verification - sử dụng trong API endpoints thay vì middleware
export async function requireAuth(event: RequestEvent) {
	const session = await event.locals.auth();
	
	if (!session || !session.user) {
		throw json(
			{
				error: 'Unauthorized',
				message: 'Authentication required',
				code: 'NO_VALID_SESSION'
			},
			{ status: 401 }
		);
	}
	
	return session;
}
