<script>
   
  import { fireCollection, collectedFire } from '../stores.js';
  import { keysLeo, keysAries, keysSagittarius } from '../constants.js';
  
  import SagittariusVessel from './SagittariusVessel.svelte';
  import LeoVessel from './LeoVessel.svelte';
  import AriesVessel from './AriesVessel.svelte';

  const keysFire = [...keysAries, ...keysLeo, ...keysSagittarius];

  function redeemFire() {

    $fireCollection = $fireCollection.filter(cardKey => !keysFire.includes(cardKey)); 
  }

</script>

<div class="elemental-vessel">

  {#if $collectedFire}

    <div class="zodiac-vessel-label">

      <button on:click={redeemFire}>
      🜂    
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
  }
  
  .zodiac-vessel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .decan-vessel {
    margin: 0px;
    padding: 0px;
    border-style: double;
    border-radius: 5px;
  }

</style>