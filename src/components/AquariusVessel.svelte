<script>
  
  import { airCollection, collectedAquarius } from '../stores.js';
  import { keysAquarius } from '../constants.js';
  import AirDecanVessel from './AirDecanVessel.svelte';

  function redeemAquarius() {

    $airCollection = $airCollection.filter(cardKey => !keysAquarius.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  <div class="zodiac-vessel">

    {#if $collectedAquarius}
    
      <div class="zodiac-vessel-label">

        <button on:click={redeemAquarius}>
        ♒    
        </button>
      
      </div>

    {:else}

      {#each keysAquarius as cardKey, i}

        <AirDecanVessel {cardKey} />

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