<script>
  

  import { 

    selectedCardsForDaemon, 
    daemonCards,
    playerCards,
    deck, 
    currentDeckCount
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

</script>

Deck Count: {$currentDeckCount}

<button on:click={newDeal}>Deal Two Trees</button>

<div class="witches-cradle">

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

</div>

<style>

  .daemon-cards {
    display: flex;
  }

  .player-cards {
    display: flex;
  }

</style> 