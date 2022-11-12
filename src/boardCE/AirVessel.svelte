
<script>
  
  import GeminiVessel from './GeminiVessel.svelte';
  import AquariusVessel from './AquariusVessel.svelte';
  import LibraVessel from './LibraVessel.svelte';

  import { 
    waterCollection, 
    airCollection, 
    earthCollection,
    fireCollection, 
    collectedAir,
    collectedSpirit,
    heatIndex,
    moistureIndex,
    currentElementRuleText,
  } from './stores.js';

  import { 
    keysGemini, 
    keysAquarius, 
    keysLibra,
    keysAir
  } from '../constants.js';

  
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();


  function notifyElementChange(){
    addNotification({
      position: 'top-center',
      text: 'Air',
      type: 'error',
      description: $currentElementRuleText,
    });
  }


  function redeemAir() {
    
    if($collectedSpirit){
      
      redeemSpirit()
      selectAir(true);

    }else{

      $airCollection =  $airCollection.filter(
                            cardKey => 
                            !keysAir.includes(cardKey)
                          ); 

      selectAir(false);
    }

    notifyElementChange();
  }

  function selectAir(resetIndexes){

    if(resetIndexes){

      $heatIndex = 9;
      $moistureIndex = 9;

    }else{

      $heatIndex += 9;
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