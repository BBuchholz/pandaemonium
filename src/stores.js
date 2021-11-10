import { writable } from 'svelte/store';

export const selectedCardForPlayer = writable('XY');
export const selectedCardForDaemon = writable('XX');