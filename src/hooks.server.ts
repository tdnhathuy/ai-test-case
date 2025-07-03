import { type Routes } from '@/lib/ROUTES';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as handleAuth } from './auth';
import { connectMongo } from '@/lib/common/server/mongoose.server';

const ignoreChromeDevTools: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools')) {
		return new Response(null, { status: 204 });
	}
	return resolve(event);
};

const initDb: Handle = async ({ event, resolve }) => {
	await connectMongo();
	return resolve(event);
};

const authorizationHandle: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();

	if (event.route.id === '/') {
		if (session) {
			const home: Routes = '/home';
			return redirect(303, home);
		}

		const publicRoutes: Routes[] = ['/auth', '/signin', '/signout', '/'];
		if (publicRoutes.includes(event.route.id)) {
			return redirect(303, publicRoutes[0]);
		}
	}

	return resolve(event);
};

export const handle: Handle = sequence(
	initDb,
	ignoreChromeDevTools,
	handleAuth,
	authorizationHandle
);
