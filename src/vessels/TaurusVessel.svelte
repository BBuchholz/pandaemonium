<script>
  
  import { 
    earthCollection, 
    collectedTaurus 
  } from './stores.js';
  import { keysTaurus } from '../constants.js';
  import EarthDecanVessel from './EarthDecanVessel.svelte';

  function redeemTaurus() {

    $earthCollection = $earthCollection.filter(cardKey => !keysTaurus.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedTaurus}
  
    <div class="sign-vessel">

      <a 
        href="#collectedTaurus"
        on:click={redeemTaurus}
      >
        ♉    
      </a>
    
    </div>

  {:else}

    {#each keysTaurus as cardKey, i}

      <EarthDecanVessel {cardKey} />

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