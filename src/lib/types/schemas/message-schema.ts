import z from 'zod';
import {MessageRoleSchema} from "$lib/types/schemas/message-role-schema";

export const MessageSchema = z.object({
	id: z.string().uuid().default(() => crypto.randomUUID()),
	role: MessageRoleSchema,
	content: z.string(),
	timestamp: z.preprocess((val) => val ?? new Date().toISOString(), z.string()),
	sessionId: z.string().uuid().optional()
});
