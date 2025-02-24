import z from 'zod';

export const StatusSchema = z.enum(["submitted", "streaming",  "ready", "error"]);
