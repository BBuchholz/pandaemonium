<script>
  
  import { 
    fireCollection, 
    collectedLeo, 
  } from './stores.js';

  import { 
    keysLeo, 
  } from '../constants.js';

  import FireDecanVessel from './FireDecanVessel.svelte';

  function redeemLeo() {

    $fireCollection = $fireCollection.filter(cardKey => !keysLeo.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedLeo}
  
    <div class="sign-vessel">

      <a 
        href="#collectedLeo"
        on:click={redeemLeo}
      >
        ♌    
      </a>
    
    </div>

  {:else}

    {#each keysLeo as cardKey, i}

      <FireDecanVessel {cardKey} />

    {/each}

  {/if}

</div>

<style>

  .elemental-vessel {
    background-color: '#ffffff';
    display: flex;
    flex-flow: row-reverse;
  }
  
  .sign-vessel {
    margin: 5px;
    padding: 5px;
    border-style: solid;
    border-radius: 10px;
  }

</style>