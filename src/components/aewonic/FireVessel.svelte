<script>
  
  import SagittariusVessel from './SagittariusVessel.svelte';
  import LeoVessel from './LeoVessel.svelte';
  import AriesVessel from './AriesVessel.svelte';
 
  import { 
    fireCollection, 
    collectedFire,
    heatIndex,
    moistureIndex,
    selectedQuadrant
  } from './aewonic-stores.js';

  import { 
    keysLeo, 
    keysAries, 
    keysSagittarius, 
    keysFire 
  } from '../../constants.js';
  
  function redeemFire() {

    $fireCollection = $fireCollection.filter(cardKey => !keysFire.includes(cardKey)); 

    $selectedQuadrant = 'Fire';
  }

</script>

<div class="elemental-vessel">

  {#if $collectedFire || !$selectedQuadrant}

    <div class="zodiac-vessel-label">

      <button on:click={redeemFire}>
      🜂 {$fireCollection.length > 0 ? $fireCollection.length : ''}   
      </button>
    
    </div>

  {:else}
      
    <SagittariusVessel />

    <LeoVessel />

    <AriesVessel />

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
    border: solid 3px white;
    color: white;
    background-color: #e3170a;
    border-radius: 30px;
    transition: all ease-out .2s;
    cursor: pointer;
    outline: none;
    animation: buttonPulse .2s infinite ease-in-out;
  }

</style>