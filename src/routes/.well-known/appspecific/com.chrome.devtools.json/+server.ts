import { json } from '@sveltejs/kit';

export async function GET() {
	return json({
		message: 'Chrome DevTools manifest not available'
	}, { status: 404 });
} 