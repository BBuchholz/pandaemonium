
<script>
  
  import GeminiVessel from './GeminiVessel.svelte';
  import AquariusVessel from './AquariusVessel.svelte';
  import LibraVessel from './LibraVessel.svelte';

  import { 
    airCollection, 
    collectedAir,
    heatIndex,
    moistureIndex,
    selectedQuadrant
  } from './aewonic-stores.js';

  import { 
    keysGemini, 
    keysAquarius, 
    keysLibra,
    keysAir
  } from '../../constants.js';
  
  

  function redeemAir() {

    $airCollection =  $airCollection.filter(
                          cardKey => 
                          !keysAir.includes(cardKey)
                        ); 
    
    $selectedQuadrant = 'Air';
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedAir || !$selectedQuadrant}

    <div class="zodiac-vessel-label">

      <button on:click={redeemAir}>
      🜁 {$airCollection.length > 0 ? $airCollection.length : ''}   
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
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-flow: row;
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