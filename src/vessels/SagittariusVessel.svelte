<script>
  
  import { 
    fireCollection, 
    collectedSagittarius 
  } from './stores.js';
  import { keysSagittarius } from '../constants.js';
  import FireDecanVessel from './FireDecanVessel.svelte';

  function redeemSagittarius() {

    $fireCollection = $fireCollection.filter(cardKey => !keysSagittarius.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedSagittarius}
  
    <div class="sign-vessel">

      <a 
        href="#collectedSagittarius"
        on:click={redeemSagittarius}
      >
        ♐    
      </a>
    
    </div>

  {:else}

    {#each keysSagittarius as cardKey, i}

      <FireDecanVessel {cardKey} />

    {/each}

  {/if}

</div>

<style>

  .elemental-vessel {
    background-color: '#ffffff';
    display: flex;
    flex-flow: row;
  }
  
  .sign-vessel {
    margin: 5px;
    padding: 5px;
    border-style: solid;
    border-radius: 10px;
  }

</style>