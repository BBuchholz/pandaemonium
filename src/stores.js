import { writable, derived } from 'svelte/store';

export const selectedCardsForPlayer = writable([]);
export const selectedCardsForDaemon = writable([]);
// export const selectionIsInProgress = derived(
	
// ); 

export const playerCards = writable([]);
export const daemonCards = writable([]);
export const deck = writable([]);


export const beforeGame = writable(true);
export const moistureIndex = writable(0);
export const heatIndex = writable(0);

