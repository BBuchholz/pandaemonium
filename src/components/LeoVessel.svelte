<script>
  
  import { fireCollection, collectedLeo } from '../stores.js';
  import { keysLeo } from '../constants.js';
  import FireDecanVessel from './FireDecanVessel.svelte';

  function redeemLeo() {

    $fireCollection = $fireCollection.filter(cardKey => !keysLeo.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  <div class="zodiac-vessel">

    {#if $collectedLeo}
    
      <div class="zodiac-vessel-label">

        <button on:click={redeemLeo}>
        ♒    
        </button>
      
      </div>

    {:else}

      {#each keysLeo as cardKey, i}

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