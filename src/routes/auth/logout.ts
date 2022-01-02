import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export async function get(req: ServerRequest) {
	req.locals.user = null;
	return {
		status: 302,
		headers: {
			location: '/'
		}
	};
}
