<script>

  import { 

    selectedCardsForDaemon, 
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
    selectedCards
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
          $aewonicCross,
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


  {#if $aewonicCross.length === 6}  

    <div class="daemon-cards">  

      <Card
        cardMode={$selectedQuadrant === 'Void' ? 'agency' : 'circumstance'}  
        cardKey={$aewonicCross[0]}
        i=0
        on:cardClicked={handleCardClicked}
      />
      
      <Card
        cardMode={$selectedQuadrant === 'Void' ? 'agency' : 'circumstance'}  
        cardKey={$aewonicCross[2]}
        i=1
        on:cardClicked={handleCardClicked}
      />

      <Card
        cardMode={$selectedQuadrant === 'Void' ? 'agency' : 'circumstance'}  
        cardKey={$aewonicCross[4]}
        i=2
        on:cardClicked={handleCardClicked}
      />

    </div>  

    <div class="player-cards">

      <Card 
        cardKey={$aewonicCross[1]}
        i=0
        on:cardClicked={handleCardClicked}
      />
      
      <Card 
        cardKey={$aewonicCross[3]}
        i=1
        on:cardClicked={handleCardClicked}
      />

      <Card 
        cardKey={$aewonicCross[5]}
        i=2
        on:cardClicked={handleCardClicked}
      />
    </div>  

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