<script>

  import { 
    waterCollection, 
    airCollection, 
    earthCollection, 
    fireCollection,
    collectedSpirit,
    heatIndex,
    moistureIndex,
    currentElementRuleText,
  } from './stores.js';


  
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  function notifyElementChange(){
    addNotification({
      position: 'top-center',
      text: 'Void',
      type: 'error',
      description: $currentElementRuleText,
    });
  }

  function redeemVoid() {
    
    if($collectedSpirit){
      
      redeemSpirit()
      selectVoid();

      notifyElementChange();

    }else{

      //DO NOTHING (VOID ONLY FUNCTIONS IF SPIRIT COLLECTED)
    }
  }

  function selectVoid(){

    $heatIndex = 0;
    $moistureIndex = 0;
  }

  function redeemSpirit() {

    $waterCollection = [];
    $airCollection = [];
    $earthCollection = [];
    $fireCollection = [];
  }

</script>

<div class="elemental-vessel">

  <div class="zodiac-vessel-label">

    <button on:click={redeemVoid}>
    ⛧    
    </button>
  
  </div>  

</div>

<style>

  .elemental-vessel {
    background-color: '#030303';
  }

  button {
    font-size: 15px;
    line-height: 15px;
    padding: 8px 22px 9px 22px;
    box-sizing: border-box;
    font-weight: 700;
    border: solid 3px lightgray;
    color: black;
    background-color: #BEBEBE;
    border-radius: 30px;
    transition: all ease-out .2s;
    cursor: pointer;
    outline: none;
    animation: buttonPulse .2s infinite ease-in-out;
  }


</style>