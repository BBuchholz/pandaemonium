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
    selectionIsValid
  } from './aewonic-stores.js';
 
  import Card from './ModCard.svelte';

  import KnechtController from '../../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  function loadDeck(){

    $deck = magisterLudi.dealTwelveTrees();
  }

  function newDeal(){

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

  function onNextTurn() {
    // // COPIED FROM PlayerAreaMod, NEEDS PORTING
    // dispatch('nextTurn', 'no details');
  }

  function selectionConfirmed() {
    // // COPIED FROM PlayerAreaMod, NEEDS PORTING
    // dispatch('selectionConfirmed', 'no details');
  }

</script>

Deck Count: {$currentDeckCount}

<div class="witches-cradle">

  {#if $beforeGame}

    <button 
      class="start-game"
      class:beforeGame
      on:click={onStartGame}
    >
      Play the Game!
    </button>

  {:else}

    <button on:click={newDeal}>Deal Two Trees</button>

    <div class="daemon-cards">    
    
      {#each $daemonCards as cardKey, i}

        <Card 
          isPlayerCard={false} 
          {cardKey}
          {i}
          on:cardSelected
          isSelected={$selectedCardsForDaemon.includes(cardKey)}
        />

      {/each}      

    </div>  

    <div class="player-cards">
    
      {#each $playerCards as cardKey, i}

        <Card 
          isPlayerCard={false} 
          {cardKey}
          {i}
          on:cardSelected
          isSelected={$selectedCardsForDaemon.includes(cardKey)}
        />

      {/each}      

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