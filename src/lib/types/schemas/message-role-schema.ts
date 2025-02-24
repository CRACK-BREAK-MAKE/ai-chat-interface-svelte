import z from 'zod';

export const MessageRoleSchema = z.enum(["user", "assistant", "system"]);
