// /////////////////////////////////
// // TOP LEVEL STORES
// /////////////////////////////////

import { writable, derived } from 'svelte/store';
import KnechtController from './myriad/KnechtController.js';

const magisterLudi = KnechtController();

export const modal = writable(null);
export const passPhrase = writable('');
export const affinityAnchor = writable('quotidian');
export const affinityKeys = writable([]);
export const contextualQuotes = writable([]);
export const tctClicked = writable(false);

export const deckName = writable('');

export const cardImagePath = derived(
	[deckName, ],
	([$deckName, ]) => {

		let path = "/images/cbdt/";


		if($deckName === 'traditional'){

			path = "/images/";
			console.log("cardImagePath set to traditional");
		
		}
	console.log("cardImagePath set to " + path);
		
		return path;
	}
);


/**
 * @deprecated - Since version 1.0. 
 * 							 Will be deleted in version xx.yy. 
 * 							 Use contextualQuotes writable instead.
 * 
 * Source: https://stackoverflow.com/a/19525656/670768
 */
export const headerQuote = derived(
	[passPhrase, ],
	([$passPhrase, ]) => {

		console.warn('Calling deprecated store value headerQuote');
		let quote = {};

		if($passPhrase === 'daedalus'){

			quote.content = 'The school is the servant of the ' + 
		 		'workshop and will one day be absorbed in it. ' + 
		 		'Therefore there will be no teachers or pupils ' + 
		 		'[...] but masters, journeymen, and apprentices.';

			quote.source = 'Walter Gropius';

		}

		if ($passPhrase === 'leAC'){

		}

		if ($passPhrase === 'craft') {

			quote.content = 'The school is the servant of the ' + 
		 		'workshop and will one day be absorbed in it. ' + 
		 		'Therefore there will be no teachers or pupils ' + 
		 		'[...] but masters, journeymen, and apprentices.';

			quote.source = 'Walter Gropius';

		}

		if ($passPhrase === 'Channard'){

			quote.content = 'The mind is a labyrinth, ladies and ' + 
		 		'gentlemen, a puzzle. And while the paths of the ' + 
		 		'brain are plainly visible, its ways deceptively ' + 
		 		'apparent, its destinations are unknown. Its ' + 
		 		'secrets still secret, and, if we are honest, it ' + 
		 		'is the lure of the labyrinth that draws us to our ' + 
		 		'chosen field. To unlock those secrets. Others ' + 
		 		'have been here before us and have left us signs, ' + 
		 		'but we, as explorers of the mind, must devote ' + 
		 		'our lives and energies to going further. To ' + 
		 		'tread the unknown corridors in order to find ' + 
		 		'ultimately, the final solution. We have to see. ' + 
		 		'We have to know.';

			quote.source = 'Dr. Philip Channard, Hellbound: Hellraiser II';

		}

		if ($passPhrase === 'daedalusLab') {

			quote.content = 'I would have a workshop attached to ' + 
		 		'every school, and one hour a day given up to ' + 
		 		'the teaching of simple decorative arts.';

			quote.source = 'Oscar Wilde';
		}

		if ($passPhrase === 'leMat') {

			quote.content = 'Pick A Card, Any Card...';

			quote.source = '🔮🃏🪄';

		}

		if ($passPhrase === 'alex') {

			quote.content = 'I have always imagined that Paradise ' + 
		 		'will be a kind of a Library.';

			quote.source = 'Jorge Luis Borges';
		}

		if ($passPhrase === 'lament') {

			quote.content = 'And there was music too; ' + 
		 		'a simple tune emerged from the box, ' + 
		 		'played on a mechanism that she could ' + 
		 		'not yet see. Enchanted, she delved ' + 
		 		'further. Though one piece had been ' + 
		 		'removed, the rest did not come readily. ' + 
		 		'Each segment presented a fresh challenge ' + 
		 		'to fingers and mind, the victories ' + 
		 		'rewarded with a further filigree ' + 
		 		'added to the tune.';

		 quote.source = 'The Hellbound Heart, by Clive Barker';
		}

		if ($passPhrase === 'leMonde') {

		}

		if ($passPhrase === 'leNuit') {

		}

		if ($passPhrase === 'Tzimisce') {

			const choice = getRandomInt(2);

			if(choice === 0){

				quote.content = 'This was Baphomet. This diced and ' + 
		 		'divided thing.';

				quote.source = 'Clive Barker, Cabal';

			}else{

				quote.content = "The only thing that burns in hell " + 
		 		"is the part of you that won't let go of your " + 
		 		"life: your memories, your attachments. They burn " + 
		 		"them all away, but they're not punishing you, " + 
		 		"they're freeing your soul. If you're frightened " + 
		 		"of dying and you're holding on, you'll see devils " + 
		 		"tearing your life away. If you've made your " + 
		 		"peace, then the devils are really angels freeing " + 
		 		"you from the earth.";

				quote.source = "from the film Jacob's Ladder";
			}

		}

		if ($passPhrase == 'help') {

			quote.content = 
				"Still a bit murky? What's a MyrKi?";
			quote.source = 
				"THE MGMNT"			
		}

		if(!quote.content){

			quote.content = 
				"No clue set for MyrKi " + $passPhrase;
			quote.source = 
				"THE MGMNT"
		}

		return quote;
	}
);

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export const selectedQuadrant = writable('');

export const devMode = writable(false);
export const devNotifyDelay = writable(false);

export const voidMode = writable(false);

export const requestedInitialDeal = writable('');

export const selectedCardsForPlayer = writable([]);
export const selectedCardsForDaemon = writable([]);

export const selectedCards = derived(
	[selectedCardsForDaemon, selectedCardsForPlayer],
	([$selectedCardsForDaemon, $selectedCardsForPlayer]) => {
		return [...$selectedCardsForDaemon, ...$selectedCardsForPlayer];
	}
);

export const waterCollection = writable([]);
export const airCollection = writable([]);
export const earthCollection = writable([]);
export const fireCollection = writable([]);

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


export const selectionIsSingular = derived(
	moistureIndex,
	($moistureIndex) => {
		return $moistureIndex < 1;
	}
);

export const selectionIsWet = derived(
	moistureIndex,
	($moistureIndex) => {
		return $moistureIndex > 0;
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

				//ADAPTED FROM WATER, NOT FULLY TESTED

				const affinityMapPlayer = new Map();
				const affinityMapDaemon = new Map();

				//assume true, we will test for validity violations
				//and flip this flag if any are found
				outcome = true;

				if($selectedCardsForPlayer.length < 1 || 
					 $selectedCardsForDaemon.length < 1){
					outcome = false;
				}

				for(const cardKey of $selectedCardsForPlayer){

					const cardSuit = magisterLudi.parseSuit(cardKey);
					const cardRank = magisterLudi.parseRank(cardKey, cardSuit);

					if(!affinityMapPlayer.has(cardSuit)){
						affinityMapPlayer.set(cardSuit, 1);
					} else {
						affinityMapPlayer.set(cardSuit, affinityMapPlayer.get(cardSuit) + 1);
					}

					if(!affinityMapPlayer.has(cardRank)){
						affinityMapPlayer.set(cardRank, 1);
					} else {
						affinityMapPlayer.set(cardRank, affinityMapPlayer.get(cardRank) + 1);
					}
				}

				for(const cardKey of $selectedCardsForDaemon){

					const cardSuit = magisterLudi.parseSuit(cardKey);
					const cardRank = magisterLudi.parseRank(cardKey, cardSuit);

					if(!affinityMapDaemon.has(cardSuit)){
						affinityMapDaemon.set(cardSuit, 1);
					} else {
						affinityMapDaemon.set(cardSuit, affinityMapDaemon.get(cardSuit) + 1);
					}

					if(!affinityMapDaemon.has(cardRank)){
						affinityMapDaemon.set(cardRank, 1);
					} else {
						affinityMapDaemon.set(cardRank, affinityMapDaemon.get(cardRank) + 1);
					}
				}

				for(const [key, value] of affinityMapDaemon){

					if(value > 1){
						outcome = false;
					}
				}

				for(const [key, value] of affinityMapPlayer){

					if(value > 1){
						outcome = false;
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

			// COPYING FROM FIRE, NOT FULLY TESTED
				    
    	for(let i = 0; i < 3; i++){

		    const pCardKey = $selectedCardsForPlayer[i];
		    const dCardKey = $selectedCardsForDaemon[i];

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
		}

		return outcome;
	}
);

// export const currentStateText = derived(
// 	[fireCollection, 
// 	 waterCollection,
// 	 airCollection,
// 	 earthCollection],
// 	([$fireCollection,
// 		$waterCollection,
// 		$airCollection,
// 		$earthCollection]) => {
		
// 		return "Fire Collection: [" + $fireCollection + `] 
// ` +
// 					 "Water Collection: [" + $waterCollection + `] 
// ` +
// 					 "Air Collection: [" + $airCollection + `] 
// ` +
// 					 "Earth Collection: [" + $earthCollection + `] 
// `;
// 	}
// );

export const previousTurnInfo = writable('');