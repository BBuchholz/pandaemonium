// // /////////////////////////////////
// // // ALEXANDRIA STORES
// // /////////////////////////////////

// import { writable, derived } from 'svelte/store';
// import KnechtController from './myriad/KnechtController.js';

// const magisterLudi = KnechtController();

// export const modal = writable(null);
// export const passPhrase = writable('');

// export const selectedQuadrant = writable('');

// export const devMode = writable(false);
// export const devNotifyDelay = writable(false);

// export const voidMode = writable(false);

// export const requestedInitialDeal = writable('');

// export const selectedCardsForPlayer = writable([]);
// export const selectedCardsForDaemon = writable([]);

// export const selectedCards = derived(
// 	[selectedCardsForDaemon, selectedCardsForPlayer],
// 	([$selectedCardsForDaemon, $selectedCardsForPlayer]) => {
// 		return [...$selectedCardsForDaemon, ...$selectedCardsForPlayer];
// 	}
// );

// export const waterCollection = writable([]);
// export const airCollection = writable([]);
// export const earthCollection = writable([]);
// export const fireCollection = writable([]);

// export const beforeGame = writable(true);
// export const turnFinished = writable(false);
// export const moistureIndex = writable(0);
// export const heatIndex = writable(0);
// export const nextTurnButtonText = writable('Next!');

// export const resolutionIsHeated = derived(
// 	heatIndex,
// 	($heatIndex) => {
// 		return $heatIndex > 0;
// 	}
// );


// export const selectionIsSingular = derived(
// 	moistureIndex,
// 	($moistureIndex) => {
// 		return $moistureIndex < 1;
// 	}
// );

// export const selectionIsWet = derived(
// 	moistureIndex,
// 	($moistureIndex) => {
// 		return $moistureIndex > 0;
// 	}
// );

// export const currentQuadrant = derived(
// 	[selectionIsWet, resolutionIsHeated],
// 	([$selectionIsWet, $resolutionIsHeated]) => {

// 		// Quadrant Determination follows the Empedoclean Elements
// 		// see: https://en.wikipedia.org/wiki/Classical_element#Greece 

// 		if($selectionIsWet){

// 			if($resolutionIsHeated){

// 				// Wet and Hot = Air
// 				return 'Air';

// 			}else{

// 				// Wet and Cold = Water
// 				return 'Water';
// 			}

// 		}else{

// 			if($resolutionIsHeated){

// 				// Dry and Hot
// 				return 'Fire';
				
// 			}else{

// 				// Dry and Cold
// 				return 'Earth';
// 			}
// 		}
// 	}
// );

// export const selectionIsValid = derived(
// 	[selectedCardsForPlayer,
//    selectedCardsForDaemon,
//    currentQuadrant],
//     ([$selectedCardsForPlayer,
//       $selectedCardsForDaemon,
//       $currentQuadrant]) => {

// 			let outcome = false;

// 			if($currentQuadrant === 'Water'){

// 				//assume true
// 				outcome = true;

// 				const affinityMap = new Map();

// 				// water treats all as one group, so consolidate
// 				const allCardKeys = 
// 					[
// 						...$selectedCardsForPlayer, 
// 						...$selectedCardsForDaemon
// 					];

// 				if(allCardKeys.length < 2){
// 					outcome = false;
// 				}

// 				for(const cardKey of allCardKeys){

// 					const cardSuit = magisterLudi.parseSuit(cardKey);
// 					const cardRank = magisterLudi.parseRank(cardKey, cardSuit);

// 					if(!affinityMap.has(cardSuit)){
// 						affinityMap.set(cardSuit, 1);
// 					} else {
// 						affinityMap.set(cardSuit, affinityMap.get(cardSuit) + 1);
// 					}

// 					if(!affinityMap.has(cardRank)){
// 						affinityMap.set(cardRank, 1);
// 					} else {
// 						affinityMap.set(cardRank, affinityMap.get(cardRank) + 1);
// 					}
// 				}

// 				// a broken chain can be detected by one card
// 				// having no other cards sharing an affinity
// 				for(const cardKey of allCardKeys){

// 					const cardSuit = magisterLudi.parseSuit(cardKey);
// 					const cardRank = magisterLudi.parseRank(cardKey, cardSuit);

// 					if(affinityMap.get(cardSuit) < 2 &&
// 						 affinityMap.get(cardRank) < 2){
// 						// no connections, broken chain
// 						outcome = false;
// 					}
// 				}
// 			}


// 			if($currentQuadrant === 'Air'){

// 				//ADAPTED FROM WATER, NOT FULLY TESTED

// 				const affinityMapPlayer = new Map();
// 				const affinityMapDaemon = new Map();

// 				//assume true, we will test for validity violations
// 				//and flip this flag if any are found
// 				outcome = true;

// 				if($selectedCardsForPlayer.length < 1 || 
// 					 $selectedCardsForDaemon.length < 1){
// 					outcome = false;
// 				}

// 				for(const cardKey of $selectedCardsForPlayer){

// 					const cardSuit = magisterLudi.parseSuit(cardKey);
// 					const cardRank = magisterLudi.parseRank(cardKey, cardSuit);

// 					if(!affinityMapPlayer.has(cardSuit)){
// 						affinityMapPlayer.set(cardSuit, 1);
// 					} else {
// 						affinityMapPlayer.set(cardSuit, affinityMapPlayer.get(cardSuit) + 1);
// 					}

// 					if(!affinityMapPlayer.has(cardRank)){
// 						affinityMapPlayer.set(cardRank, 1);
// 					} else {
// 						affinityMapPlayer.set(cardRank, affinityMapPlayer.get(cardRank) + 1);
// 					}
// 				}

// 				for(const cardKey of $selectedCardsForDaemon){

// 					const cardSuit = magisterLudi.parseSuit(cardKey);
// 					const cardRank = magisterLudi.parseRank(cardKey, cardSuit);

// 					if(!affinityMapDaemon.has(cardSuit)){
// 						affinityMapDaemon.set(cardSuit, 1);
// 					} else {
// 						affinityMapDaemon.set(cardSuit, affinityMapDaemon.get(cardSuit) + 1);
// 					}

// 					if(!affinityMapDaemon.has(cardRank)){
// 						affinityMapDaemon.set(cardRank, 1);
// 					} else {
// 						affinityMapDaemon.set(cardRank, affinityMapDaemon.get(cardRank) + 1);
// 					}
// 				}

// 				for(const [key, value] of affinityMapDaemon){

// 					if(value > 1){
// 						outcome = false;
// 					}
// 				}

// 				for(const [key, value] of affinityMapPlayer){

// 					if(value > 1){
// 						outcome = false;
// 					}
// 				}

// 			}


// 			if($currentQuadrant === 'Earth'){
// 				// implement first
// 				// Contracting and Solitary (Cold and Dry)
// 				// one card from each tree
// 				// should match either suit or rank

// 				let isSolitary = $selectedCardsForPlayer.length === 1 &&
// 	       		   		  	     $selectedCardsForDaemon.length === 1;

//   	    if(isSolitary){

// 	  	    let playerCardKey = $selectedCardsForPlayer[0];
// 	  	    let daemonCardKey = $selectedCardsForDaemon[0];

// 	  	    let daemonSuit = magisterLudi.parseSuit(daemonCardKey);
// 	  	    let playerSuit = magisterLudi.parseSuit(playerCardKey);
	  	   

// 	  	    if(daemonSuit === playerSuit){

// 	  	    	outcome = true;

// 	  	    } else {

// 	  	    	let daemonRank = magisterLudi.parseRank(daemonCardKey, daemonSuit);
// 	  	    	let playerRank = magisterLudi.parseRank(playerCardKey, playerSuit);

//   	    		if(playerRank === daemonRank){

//   	    			outcome = true;
//   	    		}
// 	  	    }

//   	    }

// 			}


// 			if($currentQuadrant === 'Fire'){

// 				// COPIED FROM EARTH (MODIFY)
// 				// Expanding and Solitary (Hot and Dry)
// 				// one card from each tree
// 				// valid selection is neither sharing suit or rank

// 				let isSolitary = $selectedCardsForPlayer.length === 1 &&
// 	       		   		  	     $selectedCardsForDaemon.length === 1;

//   	    if(isSolitary){

// 	  	    let playerCardKey = $selectedCardsForPlayer[0];
// 	  	    let daemonCardKey = $selectedCardsForDaemon[0];

// 	  	    let daemonSuit = magisterLudi.parseSuit(daemonCardKey);
// 	  	    let playerSuit = magisterLudi.parseSuit(playerCardKey);

//   	    	let daemonRank = magisterLudi.parseRank(daemonCardKey, daemonSuit);
//   	    	let playerRank = magisterLudi.parseRank(playerCardKey, playerSuit);

//   	    	outcome = 
//   	    		daemonSuit != playerSuit &&
// 				 		daemonRank != playerRank;
//   	    }				
// 			}

// 			return outcome;
//     } 
// );

// export const selectionResolutionValue = derived(
// 	[selectedCardsForDaemon, 
// 	 selectedCardsForPlayer, 
// 	 currentQuadrant,
// 	 selectionIsValid],
// 	([$selectedCardsForDaemon, 
// 	  $selectedCardsForPlayer, 
// 	  $currentQuadrant,
// 	  $selectionIsValid]) => {
		
// 		let daemonRank = 0;
// 		let playerRank = 0;
// 		let daemonSuit = '?';
// 		let playerSuit = '?';

		
// 		for(const cardKey of $selectedCardsForDaemon){

// 			let cardSuit = magisterLudi.parseSuit(cardKey);
// 			let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
// 			let cardMoistureDelta = magisterLudi.getMDeltaFromSuit(cardSuit) * cardRank;

// 			//daemonTotalMoistureIndex += cardMoistureDelta;
// 		}

// 		for(const cardKey of $selectedCardsForPlayer){
			
// 			let cardSuit = magisterLudi.parseSuit(cardKey);
// 			let cardRank = magisterLudi.parseRank(cardKey, cardSuit);
// 			let cardMoistureDelta = magisterLudi.getMDeltaFromSuit(cardSuit) * cardRank;

// 			//playerTotalMoistureIndex += cardMoistureDelta;
// 		}

// 		let outcome = [];

// 		if(!$selectionIsValid){

// 			return outcome;
// 		}

// 		if($currentQuadrant === 'Earth'){
// 			// implement first
// 			// Cooperative and Solitary (Cold and Dry)
// 			// one card from each tree
// 			// cuz wet should match either suit or rank
		  	    
// 	    let playerCardKey = $selectedCardsForPlayer[0];
// 	    let daemonCardKey = $selectedCardsForDaemon[0];

// 	    outcome.push(playerCardKey);
// 	    outcome.push(daemonCardKey);

// 		}

// 		if($currentQuadrant === 'Fire'){

// 			// COPIED FROM EARTH (MODIFIED)
// 			// Expanding and Solitary (Hot and Dry)
// 			// one card from each tree
// 			// only collect winning card, higher rank wins
		  	    
// 	    const pCardKey = $selectedCardsForPlayer[0];
// 	    const dCardKey = $selectedCardsForDaemon[0];

// 	    if(pCardKey && dCardKey){
// 		    console.log('pCardKey: ' + pCardKey);
// 		    console.log('dCardKey: ' + dCardKey);

// 			  const dSuit = magisterLudi.parseSuit(dCardKey);
// 			  const pSuit = magisterLudi.parseSuit(pCardKey);

// 			  const dRank = magisterLudi.parseRank(dCardKey, dSuit);
// 			  const pRank = magisterLudi.parseRank(pCardKey, pSuit);

// 			  if(dRank > pRank){
// 			  	outcome.push(dCardKey);
// 			  }else{
// 			  	outcome.push(pCardKey);
// 			  }
// 			}
// 		}

// 		if($currentQuadrant === 'Water'){
// 			// water treats all as one group, so consolidate
// 			const allCardKeys = 
// 				[
// 					...$selectedCardsForPlayer, 
// 					...$selectedCardsForDaemon
// 				];

// 			for(const cardKey of allCardKeys){
// 				outcome.push(cardKey);
// 			}

// 		}

// 		if($currentQuadrant === 'Air'){

// 			// COPYING FROM FIRE, NOT FULLY TESTED
				    
//     	for(let i = 0; i < 3; i++){

// 		    const pCardKey = $selectedCardsForPlayer[i];
// 		    const dCardKey = $selectedCardsForDaemon[i];

// 		    if(pCardKey && dCardKey){
// 			    console.log('pCardKey: ' + pCardKey);
// 			    console.log('dCardKey: ' + dCardKey);

// 				  const dSuit = magisterLudi.parseSuit(dCardKey);
// 				  const pSuit = magisterLudi.parseSuit(pCardKey);

// 				  const dRank = magisterLudi.parseRank(dCardKey, dSuit);
// 				  const pRank = magisterLudi.parseRank(pCardKey, pSuit);

// 				  if(dRank > pRank){
// 				  	outcome.push(dCardKey);
// 				  }else{
// 				  	outcome.push(pCardKey);
// 				  }
// 				}
// 			}
// 		}

// 		return outcome;
// 	}
// );

// // export const currentStateText = derived(
// // 	[fireCollection, 
// // 	 waterCollection,
// // 	 airCollection,
// // 	 earthCollection],
// // 	([$fireCollection,
// // 		$waterCollection,
// // 		$airCollection,
// // 		$earthCollection]) => {
		
// // 		return "Fire Collection: [" + $fireCollection + `] 
// // ` +
// // 					 "Water Collection: [" + $waterCollection + `] 
// // ` +
// // 					 "Air Collection: [" + $airCollection + `] 
// // ` +
// // 					 "Earth Collection: [" + $earthCollection + `] 
// // `;
// // 	}
// // );

// export const previousTurnInfo = writable('');