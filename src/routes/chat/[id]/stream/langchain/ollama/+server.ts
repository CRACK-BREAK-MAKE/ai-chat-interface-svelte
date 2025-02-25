import {ChatOllama} from "@langchain/ollama";
import {ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate} from "@langchain/core/prompts";
import {type RequestHandler} from '@sveltejs/kit';
import type {Message} from "$lib/types/message";

const LLM_INFERENCE_SYSTEM_TEMPLATE = `You are a helpful AI assistant. Provide clear, concise, and accurate responses.`;

const HUMAN_QUERY_WITH_HISTORY_PROMPT = `
---
### 1. Chat History
{messages}
---
### 2. User Question
{question}
---
`;

export const POST: RequestHandler = async ({request}) => {
	try {
		const {query, messages} = await request.json();
		console.log('Processing with LangChain.js and Ollama');

		// Initialize the Ollama LLM
		const llm = new ChatOllama({
			model: "qwen2.5-coder:14b",
			temperature: 0,
		});

		// Create the chat prompt template
		const chatPrompt = ChatPromptTemplate.fromMessages([
			SystemMessagePromptTemplate.fromTemplate(LLM_INFERENCE_SYSTEM_TEMPLATE),
			HumanMessagePromptTemplate.fromTemplate(HUMAN_QUERY_WITH_HISTORY_PROMPT)
		]);

		// Create a generation chain
		const generationChain = chatPrompt.pipe(llm);

		// Format the chat history for the prompt
		const history = messages.map((msg: Message) => `${msg.role}: ${msg.content}`).join('\n\n');

		// Create a TransformStream for streaming the response
		const encoder = new TextEncoder();
		const stream = new TransformStream();
		const writer = stream.writable.getWriter();

		// Stream the response in a non-blocking way
		(async () => {
			try {
				const streamingResponse = await generationChain.stream({ history: history, query: query });
				for await (const chunk of streamingResponse) {
					// @ts-expect-error - This is a valid scope data
					await writer.write(encoder.encode(chunk?.content));
				}
				await writer.close();
			} catch (error) {
				console.error('Error during streaming:', error);
				await writer.abort(error);
			}
		})();

		// Return a streaming response
		return new Response(stream.readable, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				'Connection': 'keep-alive'
			}
		});
	} catch (error) {
		console.error('Streaming error:', error);
		return new Response(JSON.stringify({error: 'Internal server error'}), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
