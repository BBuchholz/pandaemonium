<script>

  import PiscesVessel from './PiscesVessel.svelte';
  import ScorpioVessel from './ScorpioVessel.svelte';
  import CancerVessel from './CancerVessel.svelte';

  import { 
    waterCollection, 
    airCollection,
    earthCollection,
    fireCollection,
    collectedWater,
    collectedSpirit,
    heatIndex,
    moistureIndex,
    currentElementRuleText,
  } from './stores.js';

  import { 
    keysCancer, 
    keysScorpio, 
    keysPisces,
    keysWater 
  } from '../constants.js';


  
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  function notifyElementChange(){
    addNotification({
      position: 'top-center',
      text: 'Water',
      type: 'error',
      description: $currentElementRuleText,
    });
  }
  
  function redeemWater() {
    
    if($collectedSpirit){
      
      redeemSpirit()
      selectWater(true);

    }else{

      $waterCollection =  $waterCollection.filter(
                            cardKey => 
                            !keysWater.includes(cardKey)
                          ); 

      selectWater(false);
    }

    notifyElementChange();
  }

  function selectWater(resetIndexes){

    if(resetIndexes){

      $heatIndex = -9;
      $moistureIndex = 9;

    }else{

      $heatIndex += -9;
      $moistureIndex += 9;
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
    background-color: '#ffffff';
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