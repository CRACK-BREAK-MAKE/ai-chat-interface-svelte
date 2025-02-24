import { z } from 'zod';
import type {themeSchema} from "$lib/types/schemas/theme-schema";

export type Theme = z.infer<typeof themeSchema>;
