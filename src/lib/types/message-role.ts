import z from 'zod';
import type {MessageRoleSchema} from "$lib/types/schemas/message-role-schema";

export type MessageRole = z.infer<typeof MessageRoleSchema>;
