import { writable } from 'svelte/store';
import type {Status} from "$lib/types/Status";

export const statusStore = writable<Status>('ready');
