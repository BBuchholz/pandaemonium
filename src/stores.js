import { writable, derived } from 'svelte/store';
import KnechtController from './myriad/KnechtController.js';

const magisterLudi = KnechtController();

export const modal = writable(null);

export const selectedCardsForPlayer = writable([]);
export const selectedCardsForDaemon = writable([]);

export const selectedEarthSign = writable('');
export const selectedWaterSign = writable('');
export const selectedAirSign = writable('');
export const selectedFireSign = writable('');

export const playerCards = writable([]);
export const daemonCards = writable([]);
export const deck = writable([]);

export const airColCountChanged = writable(false);
export const earthColCountChanged = writable(false);
export const fireColCountChanged = writable(false);
export const waterColCountChanged = writable(false);

export const fireCollection = writable([]);

export const fireColCount = derived(
	fireCollection,
	($fireCollection) => {
		return $fireCollection.length;
	}
);


export const earthCollection = writable([]);

export const earthColCount = derived(
	earthCollection,
	($earthCollection) => {
		return $earthCollection.length;
	}
);

export const waterCollection = writable([]);

export const waterColCount = derived(
	waterCollection,
	($waterCollection) => {
		return $waterCollection.length;
	}
);


export const airCollection = writable([]);

export const airColCount = derived(
	airCollection,
	($airCollection) => {
		return $airCollection.length;
	}
);

export const beforeGame = writable(true);
export const turnFinished = writable(false);
export const moistureIndex = writable(0);
export const heatIndex = writable(0);
export const nextTurnButtonText = writable('Next!');

export const resolutionIsHeated = derived(
	heatIndex,
	($heatIndex) => {
		return $heatIndex > 0;
	}
);

export const selectionResolutionHValue = derived(
	[selectedCardsForDaemon, selectedCardsForPlayer, resolutionIsHeated],
	([$selectedCardsForDaemon, $selectedCardsForPlayer, $resolutionIsHeated]) => {
		
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

		if($resolutionIsHeated){

			outcome = playerTotalHeatIndex - daemonTotalHeatIndex;

		}else{

			outcome = playerTotalHeatIndex + daemonTotalHeatIndex;

		}

		return outcome;
	}
);

export const selectionResolutionMValue = derived(
	[selectedCardsForDaemon, selectedCardsForPlayer, resolutionIsHeated],
	([$selectedCardsForDaemon, $selectedCardsForPlayer, $resolutionIsHeated]) => {
		
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

		if($resolutionIsHeated){

			outcome = playerTotalMoistureIndex - daemonTotalMoistureIndex;

		}else{

			outcome = playerTotalMoistureIndex + daemonTotalMoistureIndex;

		}

		return outcome;
	}
);

export const selectionIsWet = derived(
	moistureIndex,
	($moistureIndex) => {
		return $moistureIndex > 0;
	}
);

export const discardCount = derived(
	[deck, earthColCount, airColCount, waterColCount, fireColCount, playerCards, daemonCards],
	([$deck, $earthColCount, $airColCount, $waterColCount, $fireColCount, $playerCards, $daemonCards]) => {

		return 36 - $deck.length - 
					 $earthColCount - 
					 $airColCount -
					 $waterColCount -
					 $fireColCount -
					 $playerCards.length -
					 $daemonCards.length;
	}
);

export const currentQuadrant = derived(
	[selectionIsWet, resolutionIsHeated],
	([$selectionIsWet, $resolutionIsHeated]) => {

		// Quadrant Determination follows the Empedoclean Elements
		// see: https://en.wikipedia.org/wiki/Classical_element#Greece 

		if($selectionIsWet){

			if($resolutionIsHeated){

				// Wet and Hot = Air
				return 'Air';

			}else{

				// Wet and Cold = Water
				return 'Water';
			}

		}else{

			if($resolutionIsHeated){

				// Dry and Hot
				return 'Fire';
				
			}else{

				// Dry and Cold
				return 'Earth';
			}
		}
	}
);

export const selectionIsValid = derived(
	[selectedCardsForPlayer,
   selectedCardsForDaemon,
   currentQuadrant],
    ([$selectedCardsForPlayer,
      $selectedCardsForDaemon,
      $currentQuadrant]) => {

			let outcome = false;

			if($currentQuadrant === 'Water'){

				///////////COPIED FROM EARTH, MODIFY////////////////////

				// implement first
				// Contracting and Solitary (Cold and Dry)
				// one card from each tree
				// should match either suit or rank

				let isSolitary = $selectedCardsForPlayer.length === 1 &&
	       		   		  	     $selectedCardsForDaemon.length === 1;

		  	    if(isSolitary){

			  	    let playerCardKey = $selectedCardsForPlayer[0];
			  	    let daemonCardKey = $selectedCardsForDaemon[0];

			  	    let daemonSuit = magisterLudi.parseSuit(daemonCardKey);
			  	    let playerSuit = magisterLudi.parseSuit(playerCardKey);
			  	   

			  	    if(daemonSuit === playerSuit){

			  	    	outcome = true;

			  	    } else {

			  	    	let daemonRank = magisterLudi.parseRank(daemonCardKey, daemonSuit);
			  	    	let playerRank = magisterLudi.parseRank(playerCardKey, playerSuit);

		  	    		if(playerRank === daemonRank){

		  	    			outcome = true;
		  	    		}
			  	    }

		  	    }

			}


			if($currentQuadrant === 'Air'){

				///////////COPIED FROM EARTH, MODIFY////////////////////
				
				// implement first
				// Contracting and Solitary (Cold and Dry)
				// one card from each tree
				// should match either suit or rank

				let isSolitary = $selectedCardsForPlayer.length === 1 &&
	       		   		  	     $selectedCardsForDaemon.length === 1;

		  	    if(isSolitary){

			  	    let playerCardKey = $selectedCardsForPlayer[0];
			  	    let daemonCardKey = $selectedCardsForDaemon[0];

			  	    let daemonSuit = magisterLudi.parseSuit(daemonCardKey);
			  	    let playerSuit = magisterLudi.parseSuit(playerCardKey);
			  	   

			  	    if(daemonSuit === playerSuit){

			  	    	outcome = true;

			  	    } else {

			  	    	let daemonRank = magisterLudi.parseRank(daemonCardKey, daemonSuit);
			  	    	let playerRank = magisterLudi.parseRank(playerCardKey, playerSuit);

		  	    		if(playerRank === daemonRank){

		  	    			outcome = true;
		  	    		}
			  	    }

		  	    }

			}


			if($currentQuadrant === 'Earth'){
				// implement first
				// Contracting and Solitary (Cold and Dry)
				// one card from each tree
				// should match either suit or rank

				let isSolitary = $selectedCardsForPlayer.length === 1 &&
	       		   		  	     $selectedCardsForDaemon.length === 1;

		  	    if(isSolitary){

			  	    let playerCardKey = $selectedCardsForPlayer[0];
			  	    let daemonCardKey = $selectedCardsForDaemon[0];

			  	    let daemonSuit = magisterLudi.parseSuit(daemonCardKey);
			  	    let playerSuit = magisterLudi.parseSuit(playerCardKey);
			  	   

			  	    if(daemonSuit === playerSuit){

			  	    	outcome = true;

			  	    } else {

			  	    	let daemonRank = magisterLudi.parseRank(daemonCardKey, daemonSuit);
			  	    	let playerRank = magisterLudi.parseRank(playerCardKey, playerSuit);

		  	    		if(playerRank === daemonRank){

		  	    			outcome = true;
		  	    		}
			  	    }

		  	    }

			}


			if($currentQuadrant === 'Fire'){

				///////////COPIED FROM EARTH, MODIFY////////////////////
				
				// implement first
				// Contracting and Solitary (Cold and Dry)
				// one card from each tree
				// should match either suit or rank

				let isSolitary = $selectedCardsForPlayer.length === 1 &&
	       		   		  	     $selectedCardsForDaemon.length === 1;

		  	    if(isSolitary){

			  	    let playerCardKey = $selectedCardsForPlayer[0];
			  	    let daemonCardKey = $selectedCardsForDaemon[0];

			  	    let daemonSuit = magisterLudi.parseSuit(daemonCardKey);
			  	    let playerSuit = magisterLudi.parseSuit(playerCardKey);
			  	   

			  	    if(daemonSuit === playerSuit){

			  	    	outcome = true;

			  	    } else {

			  	    	let daemonRank = magisterLudi.parseRank(daemonCardKey, daemonSuit);
			  	    	let playerRank = magisterLudi.parseRank(playerCardKey, playerSuit);

		  	    		if(playerRank === daemonRank){

		  	    			outcome = true;
		  	    		}
			  	    }

		  	    }

			}

			return outcome;
    } 
);

export const selectionResolutionValue = derived(
	[selectedCardsForDaemon, 
	 selectedCardsForPlayer, 
	 currentQuadrant,
	 selectionIsValid],
	([$selectedCardsForDaemon, 
	  $selectedCardsForPlayer, 
	  $currentQuadrant,
	  $selectionIsValid]) => {
		
		let daemonRank = 0;
		let playerRank = 0;
		let daemonSuit = '?';
		let playerSuit = '?';

		
		for(const cardKey of $selectedCardsForDaemon){

			let cardSuit = magisterLudi.parseSuit(cardKey);
			let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
			let cardMoistureDelta = magisterLudi.getMDeltaFromSuit(cardSuit) * cardRank;

			//daemonTotalMoistureIndex += cardMoistureDelta;
		}

		for(const cardKey of $selectedCardsForPlayer){
			
			let cardSuit = magisterLudi.parseSuit(cardKey);
			let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
			let cardMoistureDelta = magisterLudi.getMDeltaFromSuit(cardSuit) * cardRank;

			//playerTotalMoistureIndex += cardMoistureDelta;
		}

		let outcome = [];

		if(!$selectionIsValid){

			return outcome;
		}

		if($currentQuadrant === 'Earth'){
			// implement first
			// Cooperative and Solitary (Cold and Dry)
			// one card from each tree
			// cuz wet should match either suit or rank
		  	    
	    let playerCardKey = $selectedCardsForPlayer[0];
	    let daemonCardKey = $selectedCardsForDaemon[0];

	    outcome.push(playerCardKey);
	    outcome.push(daemonCardKey);

		}

		return outcome;
	}
);

