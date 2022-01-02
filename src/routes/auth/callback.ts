import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import fetch from 'node-fetch';
const tokenURL = 'https://github.com/login/oauth/access_token';

const clientId = import.meta.env.VITE_CLIENT_ID;
const secret = import.meta.env.VITE_CLIENT_SECRET;
const userURL = 'https://api.github.com/user';

async function getAccessToken(code: any) {
	const response = await fetch(tokenURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({
			client_id: clientId,
			client_secret: secret,
			code
		})
	});

	const data: any = await response.json();

	return data.access_token;
}

async function getUser(accessToken: string) {
	const response = await fetch(userURL, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	});

	const data: any = await response.json();

	return data;
}

export async function get(req: ServerRequest) {
	const code = req.url.searchParams.get('code');
	const accessToken = await getAccessToken(code);
	const user = await getUser(accessToken);

	req.locals.user = user.login;

	return {
		status: 302,
		headers: {
			location: '/'
		}
	};
}
