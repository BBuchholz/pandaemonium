<script>
  
  import { fade, fly } from 'svelte/transition';

  import { 
    selectedCardsForPlayer, 
    selectedCardsForDaemon,
    selectionIsWet,
    resolutionIsHeated
    } from './aewonic-stores.js';

  import {
    cardImagePath
  } from '../../constants.js'

  import KnechtController from '../../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  export let cardKey = 'XX';
  export let cardState = 'centered';
  export let cardMode = 'agency';
  export let i = 0;
  let src = '';
  let cardTitle = 'card title';
  let cardPower = 'zw';
  let cardSuit = '?';

  $: src = getImgSrcFromCardKey(cardKey);
  $: cardPower = getElementalSymbolFromCardKey(cardKey); 
  $: cardSuit = magisterLudi.parseSuit(cardKey);
  $: cardTitle = magisterLudi.parseRank(cardKey, cardSuit);
  $: console.log("cardState: " + cardState);
  // $: console.log("isSelected for " + cardKey + ": " + isSelected);


  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // function handleClick() {

  //   dispatch('cardClicked', {
  //     cardKey: cardKey,
  //     cardMode: cardMode
  //   });
  // }


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

  function cycleState(){
    if(cardState === 'centered'){
      cardState = 'elevated';
      return;
    }
    if(cardState === 'elevated'){
      cardState = 'lowered';
      return;
    }
    if(cardState === 'lowered'){
      cardState = 'centered';
      return;
    } 
  }

  function handleClick(){

    let message = '';

    if(cardMode === 'agency'){

      cycleState();

    }

    if(cardMode === 'circumstance'){

      // 'cards in circumstance mode will not respond to clicks. (REMOVE THIS MESSAGE FROM ModCard ONCE TUTORIAL IMPLEMENTED)'
    }

    dispatch('cardClicked', {
      cardKey: cardKey,
      cardMode: cardMode,
      cardState: cardState
    });
  }

  // function handleClickPreviousImplementation() {

  //   // console.log('clicked' + cardKey);
  //   if(isPlayerCard){

  //     if($selectedCardsForPlayer.includes(cardKey)){

  //       $selectedCardsForPlayer = 
  //         $selectedCardsForPlayer.filter(cKey => cKey !== cardKey);

  //     }else{

  //       if($selectionIsWet){
          
  //         $selectedCardsForPlayer = 
  //           [...$selectedCardsForPlayer, cardKey];

  //       }else{

  //         $selectedCardsForPlayer = [cardKey];
  //       }

  //     }

  //   }else{

  //     if($selectedCardsForDaemon.includes(cardKey)){

  //       $selectedCardsForDaemon = $selectedCardsForDaemon.filter(cKey => cKey !== cardKey);

  //     }else{
      
  //       if($selectionIsWet) {
          
  //         $selectedCardsForDaemon = 
  //           [...$selectedCardsForDaemon, cardKey];

  //       }else{

  //         $selectedCardsForDaemon = [cardKey];
  //       }
  //     }
  //   }
  // }

</script>

<div 
  class="card"
  in:fly="{{ y: 200, duration: 2000, delay: i*200 }}" 
  out:fade
  class:card-up={cardState === 'elevated'}
  class:card-down={cardState === 'lowered'}
  class:fire-color={cardSuit === 'W'}
  class:water-color={cardSuit === 'C'}
  class:air-color={cardSuit === 'S'}
  class:earth-color={cardSuit === 'D'}
  on:click={handleClick}
>
  <div 
    class="text"
    class:fire-color={cardSuit === 'W'}
    class:water-color={cardSuit === 'C'}
    class:air-color={cardSuit === 'S'}
    class:earth-color={cardSuit === 'D'}
  >{cardTitle}</div>
  <img class="image" alt={cardTitle} {src}/>
  <div class="power"
    class:fire-color={cardSuit === 'W'}
    class:water-color={cardSuit === 'C'}
    class:air-color={cardSuit === 'S'}
    class:earth-color={cardSuit === 'D'}
  >{cardPower}</div>
</div>

<style>

.card {
  opacity: 1;
  margin: 20px 10px;
  width: 90%;
  height: 90%;
  max-height: 300px;
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
/*
.card:after {
  content: "";
  position: absolute;
  top: 0;
  left: -20%;
  width: 140%;
  height: 0%;
  background: white;
  animation: sheen infinite .5s ease-in-out;
  display: none;
  transform: rotate(-7deg);
}*/

.card-up {
  transform: translateY(-20px);
  box-shadow: 0px 15px 15px rgba(0,0,0,.3);
}

.card-down {
  transform: translateY(20px);
  box-shadow: 0px 15px 15px rgba(0,0,0,.3);
}

.card .power {
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

.card .text {
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