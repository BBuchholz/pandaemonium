<script>

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  import PiscesVessel from './PiscesVessel.svelte';
  import ScorpioVessel from './ScorpioVessel.svelte';
  import CancerVessel from './CancerVessel.svelte';

  import { 
    waterCollection, 
    collectedWater,
    selectedQuadrant,
  } from './stores.js';
 
  import { 
    keysCancer, 
    keysScorpio, 
    keysPisces,
    keysWater 
  } from '../constants.js';

  function redeemWater() {

    dispatch('redeemWater', 'no details');
  }

</script>

<div class="elemental-vessel">
  
  {#if $collectedWater}

    <div class="zodiac-vessel-label">

      <button on:click={redeemWater}>
      🜄    
      </button>
    
    </div>

  {:else}

    <PiscesVessel />

    <ScorpioVessel />

    <CancerVessel />
  
  {/if}
    
</div>

<style>

  .elemental-vessel {
    flex-direction: row;
    display: flex;
  }

  button {
    font-size: 15px;
    line-height: 15px;
    padding: 8px 22px 9px 22px;
    box-sizing: border-box;
    font-weight: 700;
    border: solid 3px darkgray;
    color: black;
    background-color: #a9efef;
    border-radius: 30px;
    transition: all ease-out .2s;
    cursor: pointer;
    outline: none;
    animation: buttonPulse .2s infinite ease-in-out;
  }

</style>