<script>

  import KnechtController from './myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  import Card from './boardMat/Card.svelte';
  import WaterVessel from './vessels/WaterVessel.svelte';
  import AirVessel from './vessels/AirVessel.svelte';
  import EarthVessel from './vessels/EarthVessel.svelte';
  import FireVessel from './vessels/FireVessel.svelte';
  import AewonicCross from './vessels/AewonicCross.svelte';
  import ButtonsVessel from './vessels/ButtonsVessel.svelte';
   
  import { 
    passPhrase,
    devMode,
    selectedQuadrant,
  } from './stores.js';

  import { 
    keysWater, 
    keysAir, 
    keysEarth, 
    keysFire,
  } from './constants.js';

  
  import {
    deck,
    discardCount,
    waterCollection,
    airCollection,
    earthCollection,
    fireCollection,
    collectedSpirit,
  } from './vessels/stores.js'

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  function notifyPassPhraseFound(){
    addNotification({
      position: 'top-right',
      text: 'Pass Phrase Found',
      type: 'error',
      description: 'pass phrase: ' + $passPhrase,
      removeAfter: 1000,
    });
  } 

  function notifyDevMode(){
    addNotification({
      position: 'top-right',
      text: 'Dev Mode Detected',
      type: 'error',
      description: 'Check console for output logs',
      removeAfter: 3000,
    });
  } 

  function notifyQuadrantInfo(quadrantName){

    let descriptionText;

    if(quadrantName){

      descriptionText = 'Current Quadrant: ' + quadrantName;

    }else{

      descriptionText = 'No Quadrant Selected';
    }

    addNotification({
      position: 'top-right',
      text: 'Quadrant Info',
      type: 'info',
      description: descriptionText,
      removeAfter: 4000,
    });
  }

  $: notifyQuadrantInfo($selectedQuadrant);

  function notifyDeckInfo(deck, discardCount){

    let deckCount = deck.length;

    let descriptionText = 'Deck Count: ' + deckCount;
    descriptionText += '\nDiscard Count: ' + discardCount;

    addNotification({
      position: 'top-right',
      text: 'Deck Info',
      type: 'info',
      description: descriptionText,
      removeAfter: 4000,
    });
  }

  $: notifyDeckInfo($deck, $discardCount);

  function redeemSpirit() {

    $waterCollection = [];
    $airCollection = [];
    $earthCollection = [];
    $fireCollection = [];
  }

  function redeemWater() {

    if($collectedSpirit){
      
      redeemSpirit()

    }else{

      $waterCollection =  $waterCollection.filter(
                            cardKey => 
                            !keysWater.includes(cardKey)
                          ); 
    }
      
    $selectedQuadrant = 'Water';
    
  }

  function redeemAir() {

    if($collectedSpirit){
      
      redeemSpirit()

    }else{

      $airCollection =  $airCollection.filter(
                            cardKey => 
                            !keysAir.includes(cardKey)
                          ); 
    }
      
    $selectedQuadrant = 'Air';
    
  }

  function redeemEarth() {

    if($collectedSpirit){
      
      redeemSpirit()

    }else{

      $earthCollection =  $earthCollection.filter(
                            cardKey => 
                            !keysEarth.includes(cardKey)
                          ); 

    }
      
    $selectedQuadrant = 'Earth';
    
  }
  
  function redeemFire() {

    if($collectedSpirit){
      
      redeemSpirit()

    }else{

      $fireCollection = $fireCollection.filter(
                          cardKey => 
                          !keysFire.includes(cardKey)); 

    }
    
    $selectedQuadrant = 'Fire';
  }

  function loadElementalVessels(){

      $waterCollection = [
        '1C', '2C', '3C', 
        '4C', '5C', '6C',
        '7C', '8C', '9C'
      ];

      $airCollection = [
        '1S', '2S', '3S', 
        '4S', '5S', '6S',
        '7S', '8S', '9S'
      ];

      $earthCollection = [
        '1D', '2D', '3D', 
        '4D', '5D', '6D',
        '7D', '8D', '9D'
      ];

      $fireCollection = [
        '1W', '2W', '3W', 
        '4W', '5W', '6W',
        '7W', '8W', '9W'
      ];

  }

  initialize();

  function initialize(){

    if($passPhrase === 'leMonde'){
      notifyPassPhraseFound();

      if(!$devMode){
        $devMode = true;
      }
    }

    loadElementalVessels();

    if($devMode){

      notifyDevMode();

      // console.log('waterCollection: ' + $waterCollection);
      // console.log('airCollection: ' + $airCollection);
      // console.log('earthCollection: ' + $earthCollection);
      // console.log('fireCollection: ' + $fireCollection);
    }
  }

</script>

  <div class="game-board">

    <div class="vessels top">
      <WaterVessel on:redeemWater={redeemWater} />
      <AirVessel on:redeemAir={redeemAir} />
    </div>

    <div class="aewonic-cross">
      <AewonicCross />
    </div>

    <div class="buttons">
      <ButtonsVessel />
    </div>

    <div class="vessels bottom">
      <EarthVessel on:redeemEarth={redeemEarth} />
      <FireVessel on:redeemFire={redeemFire} />
    </div>

  </div> 


<style>

.game-board {

  height: 100%;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.aewonic-cross {

  flex: auto;
  overflow-y: scroll;
}

.vessels {

  display: flex;
  width: 100%;
  margin: 10px;
  flex-flow: row wrap;
  justify-content: space-around;

}

.top {

  position: absolute;
  top: 0;
}

.bottom {
  
  position: absolute;
  bottom: 0;
}

</style>