<script>
  
  import SagittariusVessel from './SagittariusVessel.svelte';
  import LeoVessel from './LeoVessel.svelte';
  import AriesVessel from './AriesVessel.svelte';
 
  import { 
    waterCollection, 
    airCollection,
    earthCollection,
    fireCollection, 
    collectedFire,
    collectedSpirit,
    heatIndex,
    moistureIndex, 
  } from './stores.js';

  import { 
    keysLeo, 
    keysAries, 
    keysSagittarius, 
    keysFire, 
  } from '../constants.js';
  
  // function redeemFire() {

  //   $fireCollection = $fireCollection.filter(cardKey => !keysFire.includes(cardKey)); 

  //   $heatIndex += 9;
  //   $moistureIndex += -9;
  // }

  function redeemFire() {
    
    if($collectedSpirit){
      
      redeemSpirit()
      selectFire(true);

    }else{

      $fireCollection =  $fireCollection.filter(
                            cardKey => 
                            !keysFire.includes(cardKey)
                          ); 

      selectFire(false);
    }
  }

  function selectFire(resetIndexes){

    if(resetIndexes){

      $heatIndex = 9;
      $moistureIndex = -9;

    }else{

      $heatIndex += 9;
      $moistureIndex += -9;

    }
  }

  function redeemSpirit() {

    $waterCollection = [];
    $airCollection = [];
    $earthCollection = [];
    $fireCollection = [];
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