<script>
  
  import EarthDecanVessel from './EarthDecanVessel.svelte';
  import VirgoVessel from './VirgoVessel.svelte';
  import TaurusVessel from './TaurusVessel.svelte';
  import CapricornVessel from './CapricornVessel.svelte';

  import { 
    earthCollection, 
    collectedEarth 
  } from '../stores.js';

  import { 
    keysVirgo, 
    keysTaurus, 
    keysCapricorn 
  } from '../constants.js';
  
  const keysEarth = 
    [...keysTaurus, ...keysVirgo, ...keysCapricorn];

  function redeemEarth() {

    $earthCollection =  $earthCollection.filter(
                          cardKey => 
                          !keysEarth.includes(cardKey)
                        ); 
  }

</script>

<div class="elemental-vessel">

  {#if $collectedEarth}

    <div class="zodiac-vessel-label">

      <button on:click={redeemEarth}>
      🜃    
      </button>
    
    </div>

  {:else}

    <VirgoVessel />

    <TaurusVessel />

    <CapricornVessel />
  
  {/if}

</div>

<style>

  .elemental-vessel {
    background-color: '#ffffff';
  }

</style>