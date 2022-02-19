<script>
  

  import { 

    selectedCardsForDaemon, 
    daemonCards,
    playerCards

  } from './aewonic-stores.js';
 
  import Card from './ModCard.svelte';

</script>

[Witches Cradle]

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