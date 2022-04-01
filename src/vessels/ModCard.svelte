<script>
  
  import { fade, fly } from 'svelte/transition';

  import { 
    selectedCardsForPlayer, 
    selectedCardsForDaemon,
    selectionIsWet,
    resolutionIsHeated,
    selectedCards
    } from '../stores.js';

  import {
    cardImagePath,
    keysVirgo,
    keysTaurus,
    keysCapricorn,
    keysGemini,
    keysAquarius,
    keysLibra,
    keysPisces,
    keysScorpio,
    keysCancer,
    keysSagittarius,
    keysLeo,
    keysAries
  } from '../constants.js'

  import { Knechtor } from '../myriad/Knechtor.js';
  const magisterLudi = new Knechtor();

  export let cardKey = 'XX';
  export let i = 0;
  let src = '';
  let cardRank = 'card rank';
  let cardElement = 'zw';
  let cardSuit = '?';
  let cardZodiac = 'zz';

  $: src = getImgSrcFromCardKey(cardKey);
  $: cardElement = getElementalSymbolFromCardKey(cardKey); 
  $: cardZodiac = getZodiacalSymbolFromCardKey(cardKey);
  $: cardSuit = magisterLudi.parseSuit(cardKey);
  $: cardRank = magisterLudi.parseRank(cardKey, cardSuit);

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleClick() {

    dispatch('cardClicked', {
      cardKey: cardKey
    });
  }


  function getImgSrcFromCardKey(powerString){
    // return '/images/' + powerString + '.jpg';
    return cardImagePath + powerString + '.jpg';
  }

  function getElementalSymbolFromCardKey(cardKey){
    const suit = magisterLudi.parseSuit(cardKey);
    switch(suit){
      case 'C':
        return '🜄';
      case 'W':
        return '🜂';
      case 'D':
        return '🜃';
      case 'S':
        return '🜁';
      default:  
        return '';
    }
  }

function getZodiacalSymbolFromCardKey(cardKey){
    
    if(keysVirgo.includes(cardKey)){
      return "♍";
    }

    if(keysTaurus.includes(cardKey)){
      return "♉";
    }
    
    if(keysScorpio.includes(cardKey)){
      return "♏";
    }
    
    if(keysSagittarius.includes(cardKey)){
      return "♐";
    }
    
    if(keysPisces.includes(cardKey)){
      return "♓";
    }
    
    if(keysLibra.includes(cardKey)){
      return "♎";
    }
    
    if(keysLeo.includes(cardKey)){
      return "♌";
    }
    
    if(keysGemini.includes(cardKey)){
      return "♊";
    }
    
    if(keysCapricorn.includes(cardKey)){
      return "♑";
    }
    
    if(keysCancer.includes(cardKey)){
      return "♋";
    }
    
    if(keysAries.includes(cardKey)){
      return "♈";
    }
    
    if(keysAquarius.includes(cardKey)){
      return "♒";
    }
    
  }



  function cardUp(){

    if(cardSuit === 'S' || cardSuit === 'W'){
      return true;
    }    
  }

  function cardDown(){


    if(cardSuit === 'D' || cardSuit === 'C'){
      return true;
    }

  }

</script>

<div 
  class="card"
  in:fly="{{ y: 200, duration: 2000, delay: i*200 }}" 
  out:fade
  class:card-up={$selectedCards.includes(cardKey) && cardUp(cardKey)}
  class:card-down={$selectedCards.includes(cardKey) && cardDown(cardKey)}
  class:fire-color={cardSuit === 'W'}
  class:water-color={cardSuit === 'C'}
  class:air-color={cardSuit === 'S'}
  class:earth-color={cardSuit === 'D'}
  on:click={handleClick}
>
  <div 
    class="card-zodiac"
    class:fire-color={cardSuit === 'W'}
    class:water-color={cardSuit === 'C'}
    class:air-color={cardSuit === 'S'}
    class:earth-color={cardSuit === 'D'}
    class:card-selected-invisible={$selectedCards.includes(cardKey)}
  >{cardZodiac}</div>
  <div 
    class="card-rank"
    class:fire-color={cardSuit === 'W'}
    class:water-color={cardSuit === 'C'}
    class:air-color={cardSuit === 'S'}
    class:earth-color={cardSuit === 'D'}
    class:card-selected-invisible={$selectedCards.includes(cardKey)}
  >{cardRank}</div>
  <img class="image" alt={cardRank} {src}/>
  <div class="card-element"
    class:fire-color={cardSuit === 'W'}
    class:water-color={cardSuit === 'C'}
    class:air-color={cardSuit === 'S'}
    class:earth-color={cardSuit === 'D'}
    class:card-selected-invisible={$selectedCards.includes(cardKey)}
  >{cardElement}</div>
</div>

<style>

.card {
  opacity: 1;
  margin: 20px 10px;
  width: 100%;
  height: 100%;
  max-height: 250px;
  max-width: 150px;
  padding: 3px;
  color: black;
  font-size: 14px;
  line-height: 18px;
  font-weight: bold;
  position: relative;
  border-radius: 3%;
  box-sizing: border-box;
  text-align: center;
  transition: all .15s ease-out;
  box-shadow: 0px 5px 5px rgba(0,0,0,.3);
  overflow: hidden;
}

.card-up {
  transform: translateY(-20px);
  box-shadow: 0px 15px 15px rgba(0,0,0,.3);
}

.card-down {
  transform: translateY(20px);
  box-shadow: 0px 15px 15px rgba(0,0,0,.3);
}

.card-element {
  font-size: 30px;
  position: absolute;
  bottom: 0px;
  line-height: 30px;
  left: 0px;
  width: 30px;
  height: 30px;
  padding: 3px;
  text-align: center;
  border-radius: 12%;
  color: black;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.card-rank {
  font-size: 30px;
  position: absolute;
  top: 0px;
  line-height: 30px;
  right: 6px;
  width: 30px;
  height: 30px;
  padding: 3px;
  text-align: center;
  border-radius: 12%;
  border-spacing: 12px;
  color: black;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.card-zodiac {
  font-size: 20px;
  position: absolute;
  align-content: center;
  align-items: center;
  top: 0px;
  line-height: 30px;
  left: 4px;
  width: 30px;
  height: 30px;
  padding: 3px;
  text-align: center;
  border-radius: 12%;
  border-spacing: 12px;
  color: black;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.card-selected-invisible {
  display: none;
}

img {
  width: 70%;
  height: 70%;
  vertical-align: center;
  object-fit: contain;
}

/* Elemental Styles */
.fire-color {
  background-color: #e3170a;
}

.air-color {
  background-color: #ffca3a;
}

.water-color {
  background-color: #a9efef;
}

.earth-color {
  background-color: #e16036;
}

</style>