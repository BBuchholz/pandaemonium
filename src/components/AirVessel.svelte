
<script>
  
  import GeminiVessel from './GeminiVessel.svelte';
  import AquariusVessel from './AquariusVessel.svelte';
  import LibraVessel from './LibraVessel.svelte';

  import { 
    airCollection, 
    collectedAir,
    heatIndex,
    moistureIndex
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
    
    // // uncomment when implemented
    // $heatIndex += 1;
    // $moistureIndex += 1;
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

  button {
    font-size: 15px;
    line-height: 15px;
    padding: 8px 22px 9px 22px;
    box-sizing: border-box;
    font-weight: 700;
    border: solid 3px gray;
    color: black;
    background-color: #ffca3a;
    border-radius: 30px;
    transition: all ease-out .2s;
    cursor: pointer;
    outline: none;
    animation: buttonPulse .2s infinite ease-in-out;
  }


</style>