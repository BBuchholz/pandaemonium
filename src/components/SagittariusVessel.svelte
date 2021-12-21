<script>
  
  import { fireCollection, collectedSagittarius } from '../stores.js';
  import { keysSagittarius } from '../constants.js';
  import FireDecanVessel from './FireDecanVessel.svelte';

  function redeemSagittarius() {

    $fireCollection = $fireCollection.filter(cardKey => !keysSagittarius.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  <div class="zodiac-vessel">

    {#if $collectedSagittarius}
    
      <div class="zodiac-vessel-label">

        <button on:click={redeemSagittarius}>
        ♒    
        </button>
      
      </div>

    {:else}

      {#each keysSagittarius as cardKey, i}

        <FireDecanVessel {cardKey} />

      {/each}

    {/if}

  </div>

</div>

<style>

  .elemental-vessel {
    background-color: '#ffffff';
  }
  
  .zodiac-vessel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .decan-vessel {
    margin: 5px;
    padding: 5px;
    border-style: double;
    border-radius: 10px;
  }

  .collected {
    background-color: #000000;
    color: #ffffff;
  }

</style>