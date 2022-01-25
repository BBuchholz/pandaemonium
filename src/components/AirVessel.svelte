<script>
  
  import GeminiVessel from './GeminiVessel.svelte';
  import AquariusVessel from './AquariusVessel.svelte';
  import LibraVessel from './LibraVessel.svelte';

  import { 
    airCollection, 
    collectedAir 
  } from '../stores.js';

  import { 
    keysGemini, 
    keysAquarius, 
    keysLibra 
  } from '../constants.js';
  
  const keysAir = 
    [...keysAquarius, ...keysGemini, ...keysLibra];

  function redeemAir() {

    $airCollection =  $airCollection.filter(
                          cardKey => 
                          !keysAir.includes(cardKey)
                        ); 
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedAir}

    <div class="zodiac-vessel-label">

      <button on:click={redeemAir}>
      🜁    
      </button>
    
    </div>

  {:else}

    <GeminiVessel />

    <AquariusVessel />

    <LibraVessel />
  
  {/if}

</div>

<style>

  .elemental-vessel {
    background-color: '#ffffff';
  }

</style>