import { writable, derived } from 'svelte/store';
// import KnechtController from '../../myriad/KnechtController.js';

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
} from '../constants.js'; 

// const magisterLudi = KnechtController();


import { Knechtor } from '../myriad/Knechtor.js';
const magisterLudi = new Knechtor();

const testingElementalVessels = false;

export const modal = writable(null);

export const singleSteadCardKey = writable('2D');

export const rulesIncludeElementalShiftsOnAllCollections =
	writable(true);

// export const selectedCards = writable([]);
export const selectedCardsForPlayer = writable([]);
export const selectedCardsForDaemon = writable([]);

export const selectedCards = derived(
	[selectedCardsForDaemon, selectedCardsForPlayer],
	([$selectedCardsForDaemon, $selectedCardsForPlayer]) => {
		return [...$selectedCardsForDaemon, ...$selectedCardsForPlayer];
	}
);

export const selectedEarthSign = writable('');
export const selectedWaterSign = writable('');
export const selectedAirSign = writable('');
export const selectedFireSign = writable('');

export const selectedQuadrant = writable('');

// export const playerCards = writable([]);
// export const daemonCards = writable([]);
export const deck = writable([]);
// THIS WILL REPLACE playerCards and daemonCards
// just a six value array, in deal order,
// starting with the daemon, so indices 0, 2, and 4 
// are daemon cards, while indices 1, 3, and 5
// are player cards
export const aewonicCross = writable([]);

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


export const collectedSpirit = derived(
	[collectedWater, collectedAir, collectedEarth, collectedFire],
	([$collectedWater, $collectedAir, $collectedEarth, $collectedFire]) => {
		
		return $collectedWater && $collectedAir && $collectedEarth && $collectedFire;
	}
);

export const currentDeckCount = derived(
	[deck, aewonicCross],
	([$deck, $aewonicCross]) => {
		return $deck.length;
	}
);

export const beforeGame = writable(true);
export const turnFinished = writable(false);
export const moistureIndex = writable(0);
export const heatIndex = writable(0);

export const resolutionIsHeated = derived(
	heatIndex,
	($heatIndex) => {
		return $heatIndex > 0;
	}
);

// export const selectionResolutionHValue = derived(
// 	[selectedCardsForDaemon, selectedCardsForPlayer, resolutionIsHeated],
// 	([$selectedCardsForDaemon, $selectedCardsForPlayer, $resolutionIsHeated]) => {
		
// 		let daemonTotalHeatIndex = 0;
// 		let playerTotalHeatIndex = 0;
		
// 		for(const cardKey of $selectedCardsForDaemon){

// 			let cardSuit = magisterLudi.parseSuit(cardKey);
// 			let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
// 			let cardHeatDelta = magisterLudi.getHDeltaFromSuit(cardSuit) * cardRank;

// 			daemonTotalHeatIndex += cardHeatDelta;
// 		}

// 		for(const cardKey of $selectedCardsForPlayer){
			
// 			let cardSuit = magisterLudi.parseSuit(cardKey);
// 			let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
// 			let cardHeatDelta = magisterLudi.getHDeltaFromSuit(cardSuit) * cardRank;

// 			playerTotalHeatIndex += cardHeatDelta;
// 		}

// 		let outcome = 0;

// 		if($resolutionIsHeated){

// 			outcome = playerTotalHeatIndex - daemonTotalHeatIndex;

// 		}else{

// 			outcome = playerTotalHeatIndex + daemonTotalHeatIndex;

// 		}

// 		return outcome;
// 	}
// );

// export const selectionResolutionMValue = derived(
// 	[selectedCardsForDaemon, selectedCardsForPlayer, resolutionIsHeated],
// 	([$selectedCardsForDaemon, $selectedCardsForPlayer, $resolutionIsHeated]) => {
		
// 		let daemonTotalMoistureIndex = 0;
// 		let playerTotalMoistureIndex = 0;
		
// 		for(const cardKey of $selectedCardsForDaemon){

// 			let cardSuit = magisterLudi.parseSuit(cardKey);
// 			let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
// 			let cardMoistureDelta = magisterLudi.getMDeltaFromSuit(cardSuit) * cardRank;

// 			daemonTotalMoistureIndex += cardMoistureDelta;
// 		}

// 		for(const cardKey of $selectedCardsForPlayer){
			
// 			let cardSuit = magisterLudi.parseSuit(cardKey);
// 			let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
// 			let cardMoistureDelta = magisterLudi.getMDeltaFromSuit(cardSuit) * cardRank;

// 			playerTotalMoistureIndex += cardMoistureDelta;
// 		}

// 		let outcome = 0;

// 		if($resolutionIsHeated){

// 			outcome = playerTotalMoistureIndex - daemonTotalMoistureIndex;

// 		}else{

// 			outcome = playerTotalMoistureIndex + daemonTotalMoistureIndex;

// 		}

// 		return outcome;
// 	}
// );

export const selectionIsWet = derived(
	moistureIndex,
	($moistureIndex) => {
		return $moistureIndex > 0;
	}
);

export const selectionIsSingular = derived(
	moistureIndex,
	($moistureIndex) => {
		return $moistureIndex < 1;
	}
);

export const playerCards = derived(
	aewonicCross,
	($aewonicCross) => {

		let pCards = [];

		for(let i = 1; i < 6; i += 2){
			if($aewonicCross[i]){
				pCards.push($aewonicCross[i]);
			}
		}

		return pCards;
	}
);

export const daemonCards = derived(
	aewonicCross,
	($aewonicCross) => {

		let dCards = [];

		for(let i = 0; i < 6; i += 2){
			if($aewonicCross[i]){
				dCards.push($aewonicCross[i]);
			}
		}

		return dCards;
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

export const nextTurnButtonText = derived(
	[currentDeckCount, discardCount],
	([$currentDeckCount, $discardCount]) => {
		return 'Next (Deck: ' + $currentDeckCount + ' Discard: ' + $discardCount + ')';
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
   selectedQuadrant],
    ([$selectedCardsForPlayer,
      $selectedCardsForDaemon,
      $selectedQuadrant]) => {

			let outcome = false;

			if($selectedQuadrant === 'Water'){

			}


			if($selectedQuadrant === 'Air'){


			}


			if($selectedQuadrant === 'Earth'){
				
				if($selectedCardsForDaemon.length === 1 && 
					 $selectedCardsForPlayer.length === 1){

			    const pCardKey = $selectedCardsForPlayer[0];
			    const dCardKey = $selectedCardsForDaemon[0];

			    outcome =  
			    	magisterLudi.validateEarthSelections(
			    		dCardKey, pCardKey);

				}
			}


			if($selectedQuadrant === 'Fire'){
				
				outcome = 
					$selectedCardsForDaemon.length === 1 && 
					$selectedCardsForPlayer.length === 1;
			}

			return outcome;
    } 
);

export const selectionResolutionValue = derived(
	[selectedCardsForDaemon, 
	 selectedCardsForPlayer, 
	 selectedQuadrant,
	 selectionIsValid],
	([$selectedCardsForDaemon, 
	  $selectedCardsForPlayer, 
	  $selectedQuadrant,
	  $selectionIsValid]) => {
		
		// let daemonRank = 0;
		// let playerRank = 0;
		// let daemonSuit = '?';
		// let playerSuit = '?';

		
		// for(const cardKey of $selectedCardsForDaemon){

		// 	let cardSuit = magisterLudi.parseSuit(cardKey);
		// 	let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
		// 	// let cardMoistureDelta = magisterLudi.getMDeltaFromSuit(cardSuit) * cardRank;

		// 	//daemonTotalMoistureIndex += cardMoistureDelta;
		// }

		// for(const cardKey of $selectedCardsForPlayer){
			
		// 	let cardSuit = magisterLudi.parseSuit(cardKey);
		// 	let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
		// 	// let cardMoistureDelta = magisterLudi.getMDeltaFromSuit(cardSuit) * cardRank;

		// 	//playerTotalMoistureIndex += cardMoistureDelta;
		// }

		let outcome = [];

		if(!$selectionIsValid){

			return outcome;
		}

		if($selectedQuadrant === 'Water'){

		}

		if($selectedQuadrant === 'Air'){

		}

		if($selectedQuadrant === 'Earth'){

		  	    
	    const pCardKey = $selectedCardsForPlayer[0];
	    const dCardKey = $selectedCardsForDaemon[0];

	    if(pCardKey && dCardKey){
		    console.log('pCardKey: ' + pCardKey);
		    console.log('dCardKey: ' + dCardKey);


		    for(const res of magisterLudi.resolveEarthSelections(
						dCardKey, pCardKey)){

					outcome.push(res);	
		    }
			}
		}

		if($selectedQuadrant === 'Fire'){

		  	    
	    const pCardKey = $selectedCardsForPlayer[0];
	    const dCardKey = $selectedCardsForDaemon[0];

	    if(pCardKey && dCardKey){
		    console.log('pCardKey: ' + pCardKey);
		    console.log('dCardKey: ' + dCardKey);


		    for(const res of magisterLudi.resolveFireSelections(
						dCardKey, pCardKey)){

					outcome.push(res);	
		    }
			}
		}

		return outcome;
	}
);

export const noValidChoices = derived(
	[aewonicCross,
	 currentQuadrant],
	([$aewonicCross,
	  $currentQuadrant]) => {

		if($aewonicCross.length !== 6){

			// in between deals, no Valid moves not applicable
			return false;
		}

		const allValid = 
			magisterLudi
				.getAllValidSelections($aewonicCross, 
														 	 $currentQuadrant);

		return allValid.length > 0;
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

export const buttonCounts = derived(
	[currentDeckCount,
	 selectedQuadrant],
	([$currentDeckCount,
		$selectedQuadrant]) => {
	
		const counts = '(' + $currentDeckCount + ')';

		// let counts = "DC:" + $currentDeckCount;

		// if($selectedQuadrant){

		// 	counts += " Q:" + $selectedQuadrant;	
		// }

		return counts;
	}
);
