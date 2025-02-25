import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const sessionId = `${crypto.randomUUID()}`;
	redirect(307, `/chat/${sessionId}`);
};
