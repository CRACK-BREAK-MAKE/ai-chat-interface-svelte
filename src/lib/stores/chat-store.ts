import { writable } from 'svelte/store';
import type { Message } from "$lib/types/message";
import { MessageSchema } from "$lib/types/schemas/message-schema";
import type { MessageRole } from "$lib/types/message-role";

function createChatStore() {
	const { subscribe, update, set } = writable<Message[]>([]);

	return {
		subscribe,
		addMessage: (role: MessageRole, content: string, sessionId: string) => {
			const newMessage = MessageSchema.parse({
				role,
				content,
				sessionId
			});
			update(messages => [...messages, newMessage]);
			return newMessage;
		},
		updateMessage: (id: string, content: string) => {
			update(messages => messages.map(msg =>
					msg.id === id ? { ...msg, content: msg.content + content } : msg
			));
		},
		reset: () => set([])
	};
}

export const chatStore = createChatStore();
