<script>
  
  import { fade, fly } from 'svelte/transition';

  import { 
    selectedCardsForPlayer, 
    selectedCardsForDaemon,
    selectionIsWet,
    resolutionIsHeated
    } from './stores.js';

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
    keysAries,
  } from '../constants.js'

  import KnechtController from '../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  export let isPlayerCard = false;
  export let cardKey = 'XX';
  export let i = 0;
  export let isSelected = false;
  let src = '';
  let cardTitle = 'card title';
  let cardPower = 'zw';
  let cardRank = 'card rank';
  let cardElement = 'zw';
  let cardSuit = '?';
  let cardZodiac = 'zz';

  $: src = getImgSrcFromCardKey(cardPower);
  $: cardElement = getElementalSymbolFromCardKey(cardKey); 
  $: cardZodiac = getZodiacalSymbolFromCardKey(cardKey);
  $: cardSuit = magisterLudi.parseSuit(cardKey);
  $: cardRank = magisterLudi.parseRank(cardKey, cardSuit);
  $: cardTitle = cardKey;
  $: cardPower = cardKey; 
  // $: console.log("isSelected for " + cardKey + ": " + isSelected);

  // $: console.log('resolutionIsHeated' + $resolutionIsHeated);
  

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


  function handleClick() {

    // console.log('clicked' + cardKey);
    if(isPlayerCard){

      if($selectedCardsForPlayer.includes(cardKey)){

        $selectedCardsForPlayer = 
          $selectedCardsForPlayer.filter(cKey => cKey !== cardKey);

      }else{

        if($selectionIsWet){
          
          $selectedCardsForPlayer = 
            [...$selectedCardsForPlayer, cardKey];

        }else{

          $selectedCardsForPlayer = [cardKey];
        }

      }

    }else{

      if($selectedCardsForDaemon.includes(cardKey)){

        $selectedCardsForDaemon = $selectedCardsForDaemon.filter(cKey => cKey !== cardKey);

      }else{
      
        if($selectionIsWet) {
          
          $selectedCardsForDaemon = 
            [...$selectedCardsForDaemon, cardKey];

        }else{

          $selectedCardsForDaemon = [cardKey];
        }
      }
    }
  }

</script>

<div 
  class="card"
  in:fly="{{ y: 200, duration: 2000, delay: i*200 }}" 
  out:fade
  class:player-card={isPlayerCard}
  class:player-color={isPlayerCard}
  class:daemon-card={!isPlayerCard}
  class:daemon-color={!isPlayerCard}
  class:played-card-player-hot={isSelected && isPlayerCard && $resolutionIsHeated}
  class:played-card-daemon-hot={isSelected && !isPlayerCard && $resolutionIsHeated}
  class:played-card-daemon-cold={isSelected && !isPlayerCard && !$resolutionIsHeated}
  class:played-card-player-cold={isSelected && isPlayerCard && !$resolutionIsHeated}
  class:fire-color={magisterLudi.parseSuit(cardKey) === 'W'}
  class:water-color={magisterLudi.parseSuit(cardKey) === 'C'}
  class:air-color={magisterLudi.parseSuit(cardKey) === 'S'}
  class:earth-color={magisterLudi.parseSuit(cardKey) === 'D'}
  on:click={handleClick}
>
  
  <!-- <div class="text">{cardTitle}</div>
  <img class="image" alt={cardTitle} {src}/>
  <div class="power">{cardPower}</div> -->


  <div 
    class="card-zodiac"
    class:fire-color={cardSuit === 'W'}
    class:water-color={cardSuit === 'C'}
    class:air-color={cardSuit === 'S'}
    class:earth-color={cardSuit === 'D'}
  >{cardZodiac}</div>
  <div 
    class="card-rank"
    class:fire-color={cardSuit === 'W'}
    class:water-color={cardSuit === 'C'}
    class:air-color={cardSuit === 'S'}
    class:earth-color={cardSuit === 'D'}
  >{cardRank}</div>
  <img class="image" alt={cardRank} {src}/>
  <div class="card-element"
    class:fire-color={cardSuit === 'W'}
    class:water-color={cardSuit === 'C'}
    class:air-color={cardSuit === 'S'}
    class:earth-color={cardSuit === 'D'}
  >{cardElement}</div>

</div>

<style>

.card {
  opacity: 1;
  margin: 10px;
  width: 150px;
  height: 200px;
  padding: 10px;
  color: black;
  font-size: 14px;
  line-height: 18px;
  font-weight: bold;
  position: relative;
  box-sizing: border-box;
  text-align: left;
  transition: all .15s ease-out;
  box-shadow: 0px 5px 5px rgba(0,0,0,.3);
  overflow: hidden;
}

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
}

.played-card-player-cold {
  transform: translateY(-30px);
  box-shadow: 0px 15px 15px rgba(0,0,0,.3);
}

.played-card-player-hot {
  transform: translateY(30px);
  box-shadow: 0px 15px 15px rgba(0,0,0,.3);
}

.played-card-daemon-cold {
  transform: translateY(30px);
  box-shadow: 0px 15px 15px rgba(0,0,0,.3);
}

.played-card-daemon-hot {
  transform: translateY(-30px);
  box-shadow: 0px 15px 15px rgba(0,0,0,.3);
}

.card .power {
  font-size: 30px;
  position: absolute;
  bottom: 12px;
  line-height: 30px;
  left: 10px;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 50%;
  color: rgba(0,0,0,0);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

img {
  
  /*ORIGINAL*/
  /*width: 10vw;
  height: 20vh;
  object-fit: contain;*/

  display: block;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  width: 100%;
  object-fit: contain;
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

.daemon-color { 
  background-color: #2a79d0;
}

.daemon-card .power {
  background-image: url("/images/shield.svg");
}

.player-color {
  background-color: #272727;
}

.player-card .power {
  background-image: url("/images/skull.svg");
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