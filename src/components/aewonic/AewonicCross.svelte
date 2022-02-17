<script>
  

  import { 

    selectedCardsForDaemon, 
    daemonCards

  } from './aewonic-stores.js';
 
  import Card from '../Card.svelte';

</script>

[AeWoNiC Cross Goes Here]
<!-- TODO: Create Class AewonicCross.svelte for the two 
trees component, create a separate stores file just for it as
aewonic-cross-stores.js and move the relevant to it -->
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