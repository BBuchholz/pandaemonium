<script>
  

  import { 

    selectedCardsForDaemon, 
    daemonCards

  } from './aewonic-stores.js';
 
  import Card from '../Card.svelte';

</script>

[Witches Cradle Goes Here]

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