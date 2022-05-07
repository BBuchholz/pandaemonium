<script>
  
  import { 
    fireCollection, 
    collectedAries, 
  } from './stores.js';

  import { 
    keysAries, 
  } from '../constants.js';
  
  import FireDecanVessel from './FireDecanVessel.svelte';

  function redeemAries() {

    $fireCollection = $fireCollection.filter(cardKey => !keysAries.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedAries}
  
    <div class="sign-vessel">

      <a 
        href="#collectedAries"
        on:click={redeemAries}
      >
        ♈    
      </a>
    
    </div>

  {:else}

    {#each keysAries as cardKey, i}

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