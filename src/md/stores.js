// // /////////////////////////////////
// // // MD STORES
// // /////////////////////////////////

import { writable, derived } from 'svelte/store';
// import KnechtController from './myriad/KnechtController.js';

// const magisterLudi = KnechtController();

export const modal = writable(null);
export const passPhrase = writable('daedalus');

export const devMode = writable(false);
export const previousTurnInfo = writable('');
export const currentBookCount = writable(0);

export const currentBook = writable('');

export const currentBookTitle = derived(
	[currentBook], 
	([$currentBook]) => {

	if($currentBook) {

    return $currentBook.title;
  }

  return '(no book currently open)';
  
});

export const headerQuote = derived(
	[passPhrase, ],
	([$passPhrase, ]) => {

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

		if ($passPhrase === 'daedalusLab') {

			quote.content = 'I would have a workshop attached to ' + 
		 		'every school, and one hour a day given up to ' + 
		 		'the teaching of simple decorative arts.';

			quote.source = 'Oscar Wilde';
		}

		if ($passPhrase === 'leMat') {

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

		if ($passPhrase === 'leCE') {

		}

		if(!quote.content){

			quote.content = 
				"No header quote set for pass phrase " + $passPhrase;
			quote.source = 
				"THE MGMNT"
		}

		return quote;
	}
);


export const allLoadedMarkDown = writable([]);
export const displayMode = writable('Text');