import { writable, derived } from 'svelte/store';
import KnechtController from './myriad/KnechtController.js';

import { 
	keysVirgo, 
	keysTaurus, 
	keysCapricorn, 
	keysLibra, 
	keysGemini, 
	keysAquarius,
	keysPisces, 
	keysScorpio,
	keysCancer,
	keysSagittarius,
	keysLeo,
	keysAries
} from './constants.js'; 

const magisterLudi = KnechtController();
const testingElementalVessels = false;

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

export const collectedRecentlyFire = writable([]);
export const collectedRecentlyWater = writable([]);
export const collectedRecentlyAir = writable([]);
export const collectedRecentlyEarth = writable([]);


export const fireCollection = writable([]);

export const fireColCount = derived(
	fireCollection,
	($fireCollection) => {
		return $fireCollection.length;
	}
);

export const collectedSagittarius = derived(
	fireCollection,
	($fireCollection) => {

		for(const cardKey of keysSagittarius){

			if(!$fireCollection.includes(cardKey)){
				
				return false;
			}
		}

		return true;
	}
);

export const collectedLeo = derived(
	fireCollection,
	($fireCollection) => {

		for(const cardKey of keysLeo){

			if(!$fireCollection.includes(cardKey)){
				
				return false;
			}
		}

		return true;
	}
);

export const collectedAries = derived(
	fireCollection,
	($fireCollection) => {

		for(const cardKey of keysAries){

			if(!$fireCollection.includes(cardKey)){
				
				return false;
			}
		}

		return true;
	}
);


export const collectedFire = derived(
	[collectedAries, collectedLeo, collectedSagittarius],
	([$collectedAries, $collectedLeo, $collectedSagittarius]) => {

		return testingElementalVessels || $collectedAries && $collectedLeo && $collectedSagittarius;
	}
);

export const earthCollection = writable([]);

export const earthColCount = derived(
	earthCollection,
	($earthCollection) => {
		return $earthCollection.length;
	}
);

export const collectedVirgo = derived(
	earthCollection,
	($earthCollection) => {

		for(const cardKey of keysVirgo){

			if(!$earthCollection.includes(cardKey)){

				return false;
			}
		}

		return true;
	}
);

export const collectedTaurus = derived(
	earthCollection,
	($earthCollection) => {

		for(const cardKey of keysTaurus){

			if(!$earthCollection.includes(cardKey)){
				
				return false;
			}
		}

		return true;
	}
);

export const collectedCapricorn = derived(
	earthCollection,
	($earthCollection) => {

		for(const cardKey of keysCapricorn){

			if(!$earthCollection.includes(cardKey)){
				
				return false;
			}
		}

		return true;
	}
);

export const collectedEarth = derived(
	[collectedVirgo, collectedTaurus, collectedCapricorn],
	([$collectedVirgo, $collectedTaurus, $collectedCapricorn]) => {
		
		return testingElementalVessels || $collectedVirgo && $collectedTaurus && $collectedCapricorn;
	}
);

export const waterCollection = writable([]);

export const waterColCount = derived(
	waterCollection,
	($waterCollection) => {
		return $waterCollection.length;
	}
);

export const collectedPisces = derived(
	waterCollection,
	($waterCollection) => {

		for(const cardKey of keysPisces){

			if(!$waterCollection.includes(cardKey)){
				
				return false;
			}
		}

		return true;
	}
);

export const collectedCancer = derived(
	waterCollection,
	($waterCollection) => {

		for(const cardKey of keysCancer){

			if(!$waterCollection.includes(cardKey)){
				
				return false;
			}
		}

		return true;
	}
);

export const collectedScorpio = derived(
	waterCollection,
	($waterCollection) => {

		for(const cardKey of keysScorpio){

			if(!$waterCollection.includes(cardKey)){
				
				return false;
			}
		}

		return true;
	}
);

export const collectedWater = derived(
	[collectedScorpio, collectedCancer, collectedPisces],
	([$collectedScorpio, $collectedCancer, $collectedPisces]) => {
		
		return testingElementalVessels || $collectedScorpio && $collectedCancer && $collectedPisces;
	}
);

export const airCollection = writable([]);

export const airColCount = derived(
	airCollection,
	($airCollection) => {
		return $airCollection.length;
	}
);

export const collectedAquarius = derived(
	airCollection,
	($airCollection) => {

		for(const cardKey of keysAquarius){

			if(!$airCollection.includes(cardKey)){
				
				return false;
			}
		}

		return true;
	}
);

export const collectedGemini = derived(
	airCollection,
	($airCollection) => {

		for(const cardKey of keysGemini){

			if(!$airCollection.includes(cardKey)){
				
				return false;
			}
		}

		return true;
	}
);

export const collectedLibra = derived(
	airCollection,
	($airCollection) => {

		for(const cardKey of keysLibra){

			if(!$airCollection.includes(cardKey)){
				
				return false;
			}
		}

		return true;
	}
);

export const collectedAir = derived(
	[collectedLibra, collectedGemini, collectedAquarius],
	([$collectedLibra, $collectedGemini, $collectedAquarius]) => {
		
		return testingElementalVessels || $collectedLibra && $collectedGemini && $collectedAquarius;
	}
);

export const currentDeckCount = derived(
	[deck, playerCards, daemonCards],
	([$deck, $playerCards, $daemonCards]) => {
		return $deck.length;
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

				//assume true
				outcome = true;

				const affinityMap = new Map();

				// water treats all as one group, so consolidate
				const allCardKeys = 
					[
						...$selectedCardsForPlayer, 
						...$selectedCardsForDaemon
					];

				if(allCardKeys.length < 2){
					outcome = false;
				}

				for(const cardKey of allCardKeys){

					const cardSuit = magisterLudi.parseSuit(cardKey);
					const cardRank = magisterLudi.parseRank(cardKey, cardSuit);

					if(!affinityMap.has(cardSuit)){
						affinityMap.set(cardSuit, 1);
					} else {
						affinityMap.set(cardSuit, affinityMap.get(cardSuit) + 1);
					}

					if(!affinityMap.has(cardRank)){
						affinityMap.set(cardRank, 1);
					} else {
						affinityMap.set(cardRank, affinityMap.get(cardRank) + 1);
					}
				}

				// a broken chain can be detected by one card
				// having no other cards sharing an affinity
				for(const cardKey of allCardKeys){

					const cardSuit = magisterLudi.parseSuit(cardKey);
					const cardRank = magisterLudi.parseRank(cardKey, cardSuit);

					if(affinityMap.get(cardSuit) < 2 &&
						 affinityMap.get(cardRank) < 2){
						// no connections, broken chain
						outcome = false;
					}
				}
			}


			if($currentQuadrant === 'Air'){

				// NOT YET IMPLEMENTED
				alert('Air selection validity not implemented yet');
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

				// COPIED FROM EARTH (MODIFY)
				// Expanding and Solitary (Hot and Dry)
				// one card from each tree
				// valid selection is neither sharing suit or rank

				let isSolitary = $selectedCardsForPlayer.length === 1 &&
	       		   		  	     $selectedCardsForDaemon.length === 1;

  	    if(isSolitary){

	  	    let playerCardKey = $selectedCardsForPlayer[0];
	  	    let daemonCardKey = $selectedCardsForDaemon[0];

	  	    let daemonSuit = magisterLudi.parseSuit(daemonCardKey);
	  	    let playerSuit = magisterLudi.parseSuit(playerCardKey);

  	    	let daemonRank = magisterLudi.parseRank(daemonCardKey, daemonSuit);
  	    	let playerRank = magisterLudi.parseRank(playerCardKey, playerSuit);

  	    	outcome = 
  	    		daemonSuit != playerSuit &&
				 		daemonRank != playerRank;
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

		if($currentQuadrant === 'Fire'){

			// COPIED FROM EARTH (MODIFIED)
			// Expanding and Solitary (Hot and Dry)
			// one card from each tree
			// only collect winning card, higher rank wins
		  	    
	    const pCardKey = $selectedCardsForPlayer[0];
	    const dCardKey = $selectedCardsForDaemon[0];

	    if(pCardKey && dCardKey){
		    console.log('pCardKey: ' + pCardKey);
		    console.log('dCardKey: ' + dCardKey);

			  const dSuit = magisterLudi.parseSuit(dCardKey);
			  const pSuit = magisterLudi.parseSuit(pCardKey);

			  const dRank = magisterLudi.parseRank(dCardKey, dSuit);
			  const pRank = magisterLudi.parseRank(pCardKey, pSuit);

			  if(dRank > pRank){
			  	outcome.push(dCardKey);
			  }else{
			  	outcome.push(pCardKey);
			  }
			}
		}

		if($currentQuadrant === 'Water'){
			// water treats all as one group, so consolidate
			const allCardKeys = 
				[
					...$selectedCardsForPlayer, 
					...$selectedCardsForDaemon
				];

			for(const cardKey of allCardKeys){
				outcome.push(cardKey);
			}

		}

		if($currentQuadrant === 'Air'){

			alert('Air resolution not implemented yet');
		}

		return outcome;
	}
);

export const noValidChoices = derived(
	[playerCards, 
	 daemonCards,
	 currentQuadrant],
	([$playerCards, 
	  $daemonCards,
	  $currentQuadrant]) => {

		if($playerCards.length === 0 ||
			 $daemonCards.length === 0){

			// in between deals, no Valid moves not applicable, return false
			return false;
		}


		if($currentQuadrant === 'Fire'){

			const allPossible = 
				magisterLudi.allPossibleCombos($playerCards, $daemonCards);

			//card selection will be single, so we just need to find one
			// pairing that shares neither a suit or a rank
			for(const keyPair of allPossible){
				
				const pCardKey = keyPair[0];
				const dCardKey = keyPair[1];
				
			  const dSuit = magisterLudi.parseSuit(dCardKey);
			  const pSuit = magisterLudi.parseSuit(pCardKey);

			  const dRank = magisterLudi.parseRank(dCardKey, dSuit);
			  const pRank = magisterLudi.parseRank(pCardKey, pSuit);

			  if(dSuit != pSuit && dRank != pRank){

			  	// noValidChoices is false
			  	return false;
			  }
			}
		}

		if($currentQuadrant === 'Water'){

			// copying from earth, not tested

			const allPossible = 
				magisterLudi.allPossibleCombos($playerCards, $daemonCards);

			//card selection will be single, so we just need to find one
			// pairing that shares either a suit or a rank
			for(const keyPair of allPossible){
				
				const pCardKey = keyPair[0];
				const dCardKey = keyPair[1];
				
			  const dSuit = magisterLudi.parseSuit(dCardKey);
			  const pSuit = magisterLudi.parseSuit(pCardKey);

			  if(dSuit === pSuit){

			  	// noValidChoices is false
			  	return false;
			  }

			  const dRank = magisterLudi.parseRank(dCardKey, dSuit);
			  const pRank = magisterLudi.parseRank(pCardKey, pSuit);

			  if(dRank === pRank){

			  	// noValidChoices is false
			  	return false;
			  }
			}

		}

		if($currentQuadrant === 'Air'){

			alert('Air validation not implemented yet');
		}

		if($currentQuadrant === 'Earth'){

			const allPossible = 
				magisterLudi.allPossibleCombos($playerCards, $daemonCards);

			//card selection will be single, so we just need to find one
			// pairing that shares either a suit or a rank
			for(const keyPair of allPossible){
				
				const pCardKey = keyPair[0];
				const dCardKey = keyPair[1];
				
			  const dSuit = magisterLudi.parseSuit(dCardKey);
			  const pSuit = magisterLudi.parseSuit(pCardKey);

			  if(dSuit === pSuit){

			  	// noValidChoices is false
			  	return false;
			  }

			  const dRank = magisterLudi.parseRank(dCardKey, dSuit);
			  const pRank = magisterLudi.parseRank(pCardKey, pSuit);

			  if(dRank === pRank){

			  	// noValidChoices is false
			  	return false;
			  }
			}

		}

  	// noValidChoices is true
		return true;
	}
);

export const currentStateText = derived(
	[fireCollection, 
	 waterCollection,
	 airCollection,
	 earthCollection],
	([$fireCollection,
		$waterCollection,
		$airCollection,
		$earthCollection]) => {
		
		return "Fire Collection: [" + $fireCollection + `] 
` +
					 "Water Collection: [" + $waterCollection + `] 
` +
					 "Air Collection: [" + $airCollection + `] 
` +
					 "Earth Collection: [" + $earthCollection + `] 
`;
	}
);