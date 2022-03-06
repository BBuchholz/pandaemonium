<script>

  import { 

    selectedCardsForDaemon, 
    daemonCards,
    playerCards,
    deck, 
    currentDeckCount, 
    nextTurnButtonText,
    turnFinished,
    noValidChoices,
    selectionResolutionValue,
    beforeGame,
    selectionIsValid,
    selectedQuadrant,
    selectedCards
  } from './aewonic-stores.js';
 
  import Card from './ModCard.svelte';

  import KnechtController from '../../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

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

  function loadDeck(){

    $deck = magisterLudi.dealTwelveTrees();
  }

  function newDeal(){

    // resetCardStates();
    
    if($currentDeckCount < 6){

      loadDeck();
    }

    $daemonCards = [];
    $playerCards = [];

    const cardsToDeal = 3;

    for(let i = 0; i < cardsToDeal; i++){
      $daemonCards = [...$daemonCards, $deck.pop()];
      $playerCards = [...$playerCards, $deck.pop()];
    }

  }


  function onStartGame() {

    $beforeGame = false;
    newDeal();
  }

  function endGame(){
    $beforeGame = true;
    $selectedQuadrant = '';
    $daemonCards = [];
    $playerCards = [];
  }

  function onNextTurn() {
    // // COPIED FROM PlayerAreaMod, NEEDS PORTING
    // dispatch('nextTurn', 'no details');
  }

  function selectionConfirmed() {
    // // COPIED FROM PlayerAreaMod, NEEDS PORTING
    // dispatch('selectionConfirmed', 'no details');
  }

  function handleCardClicked(event) {

    let title = 'clicked ' + event.detail.cardKey;
    let description = 'cardMode: ' + event.detail.cardMode;
    description += " cardState: " + event.detail.cardState;
    description += " message: " + event.detail.message;

    let currentPlayerCardKey = event.detail.cardKey;
    //TODO: cycle through valid moves here
    $selectedCards = 
      magisterLudi.getNextValidSelection(
          currentPlayerCardKey,
          $selectedCards,
          $daemonCards,
          $selectedQuadrant
        );
    // notifyClicked(title, description);
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

<div class="top-controls">

  Deck Count: {$currentDeckCount} - 

  {#if $selectedQuadrant}

    Quadrant: {$selectedQuadrant}

  {:else}

    No Quadrant Selected

  {/if}

</div>

<div 
  class="witches-cradle"
>

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
      Deal Two Trees
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

  {:else if toBeImplemented.includes($selectedQuadrant)}

    <button 
      class="dealTwoTrees"
      class:colorWater={$selectedQuadrant === 'Water'}
      class:colorAir={$selectedQuadrant === 'Air'}
      class:colorEarth={$selectedQuadrant === 'Earth'}
      class:colorFire={$selectedQuadrant === 'Fire'}
      on:click={newDeal}
    >
      Deal Two Trees
    </button>


  {/if}

  <div class="daemon-cards">    

    {#each $daemonCards as cardKey, i}

      <Card 
        cardMode={$selectedQuadrant === 'Void' ? 'agency' : 'circumstance'} 
        {cardKey}
        {i}
        on:cardClicked={handleCardClicked}
      />

    {/each}      

  </div>  

  <div class="player-cards">

    {#each $playerCards as cardKey, i}

      <Card 
        {cardKey}
        {i}
        on:cardClicked={handleCardClicked}
      />

    {/each}      

  </div>  




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

.daemon-cards {
  display: flex;
}

.player-cards {
  display: flex;
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
}

button.confirmSelection {
  background: black;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  
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