import { writable, derived } from 'svelte/store';
import KnechtController from './myriad/KnechtController.js';

const magisterLudi = KnechtController();

export const selectedCardsForPlayer = writable([]);
export const selectedCardsForDaemon = writable([]);

export const playerCards = writable([]);
export const daemonCards = writable([]);
export const deck = writable([]);


export const beforeGame = writable(true);
export const moistureIndex = writable(0);
export const heatIndex = writable(0);

export const resolutionIsCompetitive = derived(
	heatIndex,
	($heatIndex) => {
		return $heatIndex > 0;
	}
);

export const selectionResolutionHValue = derived(
	[selectedCardsForDaemon, selectedCardsForPlayer, resolutionIsCompetitive],
	([$selectedCardsForDaemon, $selectedCardsForPlayer, $resolutionIsCompetitive]) => {
		
		let daemonTotalHeatIndex = 0;
		let playerTotalHeatIndex = 0;
		
		for(const cardKey of $selectedCardsForDaemon){

			let cardSuit = magisterLudi.parseSuit(cardKey);
			let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
			let cardHeatDelta = magisterLudi.getHDeltaFromSuit(cardSuit) * cardRank;

			daemonTotalHeatIndex += cardHeatDelta;
		}

		for(const cardKey of $selectedCardsForPlayer){
			
			let cardSuit = magisterLudi.parseSuit(cardKey);
			let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
			let cardHeatDelta = magisterLudi.getHDeltaFromSuit(cardSuit) * cardRank;

			playerTotalHeatIndex += cardHeatDelta;
		}

		let outcome = 0;

		if($resolutionIsCompetitive){

			outcome = playerTotalHeatIndex - daemonTotalHeatIndex;

		}else{

			outcome = playerTotalHeatIndex + daemonTotalHeatIndex;

		}

		return outcome;
	}
);

export const selectionResolutionMValue = derived(
	[selectedCardsForDaemon, selectedCardsForPlayer, resolutionIsCompetitive],
	([$selectedCardsForDaemon, $selectedCardsForPlayer, $resolutionIsCompetitive]) => {
		
		let daemonTotalMoistureIndex = 0;
		let playerTotalMoistureIndex = 0;
		
		for(const cardKey of $selectedCardsForDaemon){

			let cardSuit = magisterLudi.parseSuit(cardKey);
			let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
			let cardMoistureDelta = magisterLudi.getMDeltaFromSuit(cardSuit) * cardRank;

			daemonTotalMoistureIndex += cardMoistureDelta;
		}

		for(const cardKey of $selectedCardsForPlayer){
			
			let cardSuit = magisterLudi.parseSuit(cardKey);
			let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
			let cardMoistureDelta = magisterLudi.getMDeltaFromSuit(cardSuit) * cardRank;

			playerTotalMoistureIndex += cardMoistureDelta;
		}

		let outcome = 0;

		if($resolutionIsCompetitive){

			outcome = playerTotalMoistureIndex - daemonTotalMoistureIndex;

		}else{

			outcome = playerTotalMoistureIndex + daemonTotalMoistureIndex;

		}

		return outcome;
	}
);

export const selectionIsCombinatory = derived(
	moistureIndex,
	($moistureIndex) => {
		return $moistureIndex > 0;
	}
);
