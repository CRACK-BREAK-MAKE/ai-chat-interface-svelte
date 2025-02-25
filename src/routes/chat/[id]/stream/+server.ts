import {json, type RequestHandler} from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, params }) => {
	try {
		const { query, messages, sessionId } = await request.json();
		const response = await fetch('http://localhost:8080/ask', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query,
				messages: [...messages],
				sessionId: sessionId
			})
		});

		if (!response.ok) {
			return json({ error: 'Failed to get LLM response' }, { status: response.status });
		}
		return new Response(response.body, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				'Connection': 'keep-alive'
			}
		});
	} catch (error) {
		console.error('Streaming error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
