import z from 'zod';
import type {StatusSchema} from "$lib/types/schemas/status-schema";

export type Status = z.infer<typeof StatusSchema>;
