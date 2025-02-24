import z from 'zod';
import type {MessageSchema} from "$lib/types/schemas/message-schema";

export type Message = z.infer<typeof MessageSchema>;
