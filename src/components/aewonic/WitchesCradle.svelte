<script>

  import { 

    selectedCardsForDaemon,
    selectedCardsForPlayer, 
    aewonicCross,
    deck, 
    currentDeckCount, 
    nextTurnButtonText,
    turnFinished,
    noValidChoices,
    selectionResolutionValue,
    beforeGame,
    selectionIsValid,
    selectedQuadrant,
    selectedCards,
    selectionIsSingular,
    buttonCounts
  } from './aewonic-stores.js';
 
  import Card from './ModCard.svelte';

  import { Knechtor } from '../../myriad/Knechtor.js';
  const magisterLudi = new Knechtor();

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  function notifyClicked(title, description){
    addNotification({
      position: 'top-right',
      text: title,
      type: 'info',
      description: description,
      removeAfter: 4000,
    });
  }

  function notifySelectionResolutionValue(){
    addNotification({
      position: 'bottom-right',
      text: 'collected ' + $selectionResolutionValue,
      type: 'error',
      description: 'lorem ipsum',
      removeAfter: 4000,
    });
  }


  function resetSelection() {

    // roundFinished = true;
    $selectedCardsForPlayer = [];
    $selectedCardsForDaemon = [];
    $aewonicCross = [];;
    // console.log('selection reset');
  }

  function loadDeck(){

    $deck = magisterLudi.dealTwelveTrees();
  }

  function newDeal(){

    // resetCardStates();
    
    if($currentDeckCount < 6){

      loadDeck();
    }

    $aewonicCross = [];

    const cardsToDeal = 6;

    for(let i = 0; i < cardsToDeal; i++){
      $aewonicCross = [...$aewonicCross, $deck.pop()];
    }

  }


  function onStartGame() {

    $beforeGame = false;
    newDeal();
  }

  function endGame(){
    $beforeGame = true;
    $selectedQuadrant = '';
    // $daemonCards = [];
    // $playerCards = [];
    $aewonicCross = [];
  }

  function onNextTurn() {
    
    $turnFinished = false;
    // $earthColCountChanged = false;
    // $fireColCountChanged = false;
    // $airColCountChanged = false;
    // $waterColCountChanged = false;

    // $collectedRecentlyFire = [];
    // $collectedRecentlyWater = [];
    // $collectedRecentlyAir = [];
    // $collectedRecentlyEarth = [];
    
    newDeal();
  }

  function selectionConfirmed() {
    

    processCardCollection();

    $turnFinished = true;
  }

  function processCardCollection() {

    for(const cardKey of $selectionResolutionValue){

      let cardSuit = magisterLudi.parseSuit(cardKey);

      console.log('cardSuit: ' + cardSuit);

      if(cardSuit === 'D'){
        
        // if(!$earthCollection.includes(cardKey)){
          
        //   $earthCollection = [...$earthCollection, cardKey];
        //   $earthColCountChanged = true;
        //   $collectedRecentlyEarth = [...$collectedRecentlyEarth, cardKey];

        //   if($rulesIncludeElementalShiftsOnAllCollections){

        //     $heatIndex = $heatIndex - 1;
        //     $moistureIndex = $moistureIndex - 1;
        //   }
        // }
        
        
      }

      if(cardSuit === 'W'){
        
        // if(!$fireCollection.includes(cardKey)){
          
        //   $fireCollection = [...$fireCollection, cardKey];
        //   $fireColCountChanged = true;
        //   $collectedRecentlyFire = [...$collectedRecentlyFire, cardKey];

        //   if($rulesIncludeElementalShiftsOnAllCollections){

        //     $heatIndex = $heatIndex + 1;
        //     $moistureIndex = $moistureIndex - 1;
        //   }
        // }
        
      }

      if(cardSuit === 'S'){
        
        // if(!$airCollection.includes(cardKey)){
          
        //   $airCollection = [...$airCollection, cardKey];
        //   $airColCountChanged = true;
        //   $collectedRecentlyAir = [...$collectedRecentlyAir, cardKey];

        //   if($rulesIncludeElementalShiftsOnAllCollections){

        //     $heatIndex = $heatIndex + 1;
        //     $moistureIndex = $moistureIndex + 1;
        //   }
        // }
        
      }

      if(cardSuit === 'C'){
        
        // if(!$waterCollection.includes(cardKey)){
          
        //   $waterCollection = [...$waterCollection, cardKey];
        //   $waterColCountChanged = true;
        //   $collectedRecentlyWater = [...$collectedRecentlyWater, cardKey];

        //   if($rulesIncludeElementalShiftsOnAllCollections){

        //     $heatIndex = $heatIndex - 1;
        //     $moistureIndex = $moistureIndex + 1;
        //   }
        // }
        
      }
    }

    notifySelectionResolutionValue();

    resetSelection();
    // console.log('card comparison processed');
  }

  function handlePlayerCardClicked(cardKey){

    if($selectedCardsForPlayer.includes(cardKey)){

      $selectedCardsForPlayer = 
        $selectedCardsForPlayer.filter(cKey => cKey !== cardKey);

    }else{

      if($selectionIsSingular){
        
        $selectedCardsForPlayer = [cardKey];

      }else{

        $selectedCardsForPlayer = 
          [...$selectedCardsForPlayer, cardKey];

      }

    }

  }

  function handleDaemonCardClicked(cardKey){

    if($selectedCardsForDaemon.includes(cardKey)){

      $selectedCardsForDaemon = $selectedCardsForDaemon.filter(cKey => cKey !== cardKey);

    }else{
    
      if($selectionIsSingular) {

        $selectedCardsForDaemon = [cardKey];

      }else{
        
        $selectedCardsForDaemon = 
          [...$selectedCardsForDaemon, cardKey];
      }
    }

  }

  // function handleClickPreviousImplementation(cardKey) {

  //   // console.log('clicked' + cardKey);
  //   if(isPlayerCard(cardKey)){
 
  //   }else{

  //   }
  // }

  // function isPlayerCard(cardKey){
  //   return true;
  // }

  function handleCardClicked(event) {

    let title = 'clicked ' + event.detail.cardKey;
    let description = 'cardMode: ' + event.detail.cardMode;
    description += " cardState: " + event.detail.cardState;
    description += " message: " + event.detail.message;
    const cardKey = event.detail.cardKey;

    handleClickPreviousImplementation(cardKey);

    // const currentPlayerCardKey = event.detail.cardKey;
    // const currentSelectedCards = $selectedCards;
    // const currentAewonicCross = $aewonicCross;
    // const currentSelectedQuadrant = $selectedQuadrant;

    // //TODO: THIS ISNT WORKING 
    // // test is fine but its not working like this
    // // what if we somehow built a derived store for
    // // each card that would store the value and
    // // then the click handler of that card would just
    // // change the selected cards
    // let newSelectedCards = 
    //   magisterLudi.getNextValidSelection(
    //       currentPlayerCardKey,
    //       currentSelectedCards,
    //       currentAewonicCross,
    //       currentSelectedQuadrant
    //     );
    // $selectedCards = newSelectedCards;
    // // notifyClicked(title, description);
  }

  function selectWaterQuad(){
    $selectedQuadrant = 'Water';
  }

  function selectAirQuad(){
    $selectedQuadrant = 'Air';
  } 

  function selectEarthQuad(){
    $selectedQuadrant = 'Earth';
  }

  function selectFireQuad(){
    $selectedQuadrant = 'Fire';
  }

  // THIS CONTROLS WHAT STILL GETS A DEAL BUTTON DURING PLAY
  // AS QUADRANTS ARE IMPLEMENTED FULLY, WE WON"T NEED A DEAL
  // BUTTON BECAUSE NO VALID MOVES WILL TRIGGER A DEAL OPTION
  // REMOVE QUADRANTS FROM THIS LIST AS THEY ARE FULLY READY 
  // AND TESTED
  const toBeImplemented = ['Water', 'Air', 'Earth', 'Fire'];

</script>
<!-- 
<div class="top-controls">

  Deck Count: {$currentDeckCount} - 

  {#if $selectedQuadrant}

    Quadrant: {$selectedQuadrant}

  {:else}

    No Quadrant Selected

  {/if}

</div> -->

<div 
  class="witches-cradle"
>

  {#if $aewonicCross.length === 6}  

    <div class="daemon-cards">  

      <Card
        cardKey={$aewonicCross[0]}
        i=0
        on:cardClicked={handleDaemonCardClicked($aewonicCross[0])}
      />
      
      <Card
        cardKey={$aewonicCross[2]}
        i=1
        on:cardClicked={handleDaemonCardClicked($aewonicCross[2])}
      />

      <Card
        cardKey={$aewonicCross[4]}
        i=2
        on:cardClicked={handleDaemonCardClicked($aewonicCross[4])}
      />

    </div>  

    <div class="player-cards">

      <Card 
        cardKey={$aewonicCross[1]}
        i=0
        on:cardClicked={handlePlayerCardClicked($aewonicCross[1])}
      />
      
      <Card 
        cardKey={$aewonicCross[3]}
        i=1
        on:cardClicked={handlePlayerCardClicked($aewonicCross[3])}
      />

      <Card 
        cardKey={$aewonicCross[5]}
        i=2
        on:cardClicked={handlePlayerCardClicked($aewonicCross[5])}
      />
    </div>  

  {/if}


  {#if $beforeGame && !$selectedQuadrant}

    <button 
      class="colorWater"
      on:click={selectWaterQuad}
    >
     🜄
    </button>

    <button 
      class="colorAir"
      on:click={selectAirQuad}
    >
     🜁
    </button>

    <button 
      class="colorEarth"
      on:click={selectEarthQuad}
    >
     🜃
    </button>

    <button 
      class="colorFire"
      on:click={selectFireQuad}
    >
     🜂
    </button>

  {:else if $beforeGame && $selectedQuadrant}

    <button 
      class="start-game"
      class:beforeGame
      class:colorWater={$selectedQuadrant === 'Water'}
      class:colorAir={$selectedQuadrant === 'Air'}
      class:colorEarth={$selectedQuadrant === 'Earth'}
      class:colorFire={$selectedQuadrant === 'Fire'}
      on:click={onStartGame}
    >
      Deal Two Trees {$buttonCounts}
    </button>

  {:else if $currentDeckCount === 0}

    <button 
      class="dealTwoTrees"
      class:colorWater={$selectedQuadrant === 'Water'}
      class:colorAir={$selectedQuadrant === 'Air'}
      class:colorEarth={$selectedQuadrant === 'Earth'}
      class:colorFire={$selectedQuadrant === 'Fire'}
      on:click={endGame}
    >
      End Game
    </button>

  {:else if toBeImplemented.includes($selectedQuadrant) && $selectedCards.length < 1 && !$turnFinished}

    <button 
      class="dealTwoTrees"
      class:colorWater={$selectedQuadrant === 'Water'}
      class:colorAir={$selectedQuadrant === 'Air'}
      class:colorEarth={$selectedQuadrant === 'Earth'}
      class:colorFire={$selectedQuadrant === 'Fire'}
      on:click={newDeal}
    >
      Deal Two Trees {$buttonCounts}
    </button>


  {/if}


  {#if $selectionIsValid }

    <button 
      class="confirmSelection"
      on:click={selectionConfirmed}
    >

      {$selectionResolutionValue}

    </button>

  {:else}

    {#if $noValidChoices && !$beforeGame}


      <button 
        class="confirmSelection"
        on:click={selectionConfirmed}
      >

        No Valid Moves

      </button>
  
    {/if}

  {/if}

  {#if $turnFinished}

    <button 
      class="next-turn" 
      on:click={onNextTurn}
    >
      {$nextTurnButtonText}
    </button>

  {/if}

</div>

<style>

.witches-cradle {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-flow: column;
}

.daemon-cards {
  display: flex;
  flex-flow: row;
}

.player-cards {
  display: flex;
  flex-flow: row;
}

button.next-turn {
  position: absolute;
  transition: all .15s ease-out;
  background: black;
  display: block;
}

button.start-game {
  background: black;
  display: block;
  align-items: center;
}

button.dealTwoTrees {
  background: black;
  position: absolute;
}

button.confirmSelection {
  background: black;
  display: inline-block;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  position: absolute;
}

button.beforeGame {
  display: block;
  align-items: center;
}

button:hover {
  transform: scale(1.03);
}

button:active {
  transform: scale(.97);
}

button {
  font-size: 15px;
  line-height: 15px;
  padding: 8px 22px 9px 22px;
  box-sizing: border-box;
  font-weight: 700;
  border: solid 3px white;
  color: white;
  background: transparent;
  border-radius: 30px;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
}

button.colorWater {
  font-size: 15px;
  line-height: 15px;
  padding: 8px 22px 9px 22px;
  box-sizing: border-box;
  font-weight: 700;
  border: solid 3px darkgray;
  color: black;
  background-color: #a9efef;
  border-radius: 30px;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
}

button.colorAir {
  font-size: 15px;
  line-height: 15px;
  padding: 8px 22px 9px 22px;
  box-sizing: border-box;
  font-weight: 700;
  border: solid 3px gray;
  color: black;
  background-color: #ffca3a;
  border-radius: 30px;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
}

button.colorEarth {
  font-size: 15px;
  line-height: 15px;
  padding: 8px 22px 9px 22px;
  box-sizing: border-box;
  font-weight: 700;
  border: solid 3px lightgray;
  color: black;
  background-color: #e16036;
  border-radius: 30px;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
}

button.colorFire {
  font-size: 15px;
  line-height: 15px;
  padding: 8px 22px 9px 22px;
  box-sizing: border-box;
  font-weight: 700;
  border: solid 3px white;
  color: white;
  background-color: #e3170a;
  border-radius: 30px;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
}

</style> 