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
    selectedQuadrant
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

    resetCardStates();
    
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
    changeStateForClick(event.detail.cardKey);

    // notifyClicked(title, description);
  }

  function changeStateForClick(cardKey){

    //TODO: change what happens here based on toggle settings
    cardStatesByKey.set(cardKey, 'elevated');
  }

  function resetCardStates(){
    cardStatesByKey.clear();
  }

  let cardStatesByKey = new Map();

  function cardStateByKey(cardKey){

    if(cardStatesByKey.has(cardKey)){
      return cardStatesByKey.get(cardKey);
    }

    return 'centered';
  }

  function selectFireQuad(){
    $selectedQuadrant = 'Fire';
  }

  function selectEarthQuad(){
    $selectedQuadrant = 'Earth';
  }

</script>

<div class="top-controls">
  Deck Count: {$currentDeckCount} - Quadrant: {$selectedQuadrant}
</div>
<div 
  class="witches-cradle"
>

  {#if $beforeGame && !$selectedQuadrant}

    <button 
      class="fireQuad"
      on:click={selectFireQuad}
    >
     🜂
    </button>

    <button 
      class="earthQuad"
      on:click={selectEarthQuad}
    >
     🜃
    </button>

  {:else if $beforeGame && $selectedQuadrant}

    <button 
      class="start-game"
      class:beforeGame
      on:click={onStartGame}
    >
      Deal Two Trees
    </button>

  {:else if $currentDeckCount === 0}

    <button 
      class="dealTwoTrees"
      on:click={endGame}
    >
      End Game
    </button>

  {:else}

    <button 
      class="dealTwoTrees"
      on:click={newDeal}
    >
      Deal Two Trees
    </button>


  {/if}

  <div class="daemon-cards">    

    {#each $daemonCards as cardKey, i}

      <Card 
        isPlayerCard={false}
        cardMode={$selectedQuadrant === 'Void' ? 'agency' : 'circumstance'} 
        cardState={cardStateByKey(cardKey)}
        {cardKey}
        {i}
        on:cardClicked={handleCardClicked}
      />

    {/each}      

  </div>  

  <div class="player-cards">

    {#each $playerCards as cardKey, i}

      <Card 
        isPlayerCard={false} 
        cardState={cardStateByKey(cardKey)}
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

</style> 