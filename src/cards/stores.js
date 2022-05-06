import { writable, derived } from 'svelte/store';

export const singleSteadCardKey = writable('2D');

export const selectedCardsForPlayer = writable([]);
export const selectedCardsForDaemon = writable([]);

export const selectedCards = derived(
	[selectedCardsForDaemon, selectedCardsForPlayer],
	([$selectedCardsForDaemon, $selectedCardsForPlayer]) => {
		return [...$selectedCardsForDaemon, ...$selectedCardsForPlayer];
	}
);

export const deck = writable([]);

export const moistureIndex = writable(0);


export const selectionIsSingular = derived(
	moistureIndex,
	($moistureIndex) => {
		return $moistureIndex < 1;
	}
);


