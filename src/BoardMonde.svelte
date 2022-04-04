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
  import DeckVessel from './vessels/DeckVessel.svelte';
  import DiscardVessel from './vessels/DiscardVessel.svelte';
   
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
    // discardCount,
    waterCollection,
    airCollection,
    earthCollection,
    fireCollection,
    collectedSpirit,
  } from './vessels/stores.js'

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

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

  function initializeElementalVessels(){

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

  function setupDevMode(quadrantToSelect, keysToRedeem){

    console.log('setting up dev mode');

    //filter keys from each collection
    $waterCollection =  $waterCollection.filter(
                          cardKey => 
                          !keysToRedeem.includes(cardKey)
                        );
    
    $airCollection =  $airCollection.filter(
                          cardKey => 
                          !keysToRedeem.includes(cardKey)
                        );
    
    $earthCollection =  $earthCollection.filter(
                          cardKey => 
                          !keysToRedeem.includes(cardKey)
                        );
    
    $fireCollection =  $fireCollection.filter(
                          cardKey => 
                          !keysToRedeem.includes(cardKey)
                        );

    //select quadrant without redeeming
    $selectedQuadrant = quadrantToSelect;

        
  } 

  initialize();

  function initialize(){

    initializeElementalVessels();

    if($devMode){

      //use this to selectively redeem
      //some keys for testing particular 
      //gameplay scenarios
      const keysToRedeem = [
        '3C', '6C', '9C',
        '3S', '6S', '9S',
        '3D', '6D', '9D',
        '3W', '6W', '9W',
      ];

      //this will bypass the redemption
      //on selection so we can specify
      //a quadrant and surgically target
      //specific deck compositions
      setupDevMode('Earth', keysToRedeem);
    }
  }

</script>

  <div class="game-board">

    <div class="vessels top">
      <WaterVessel on:redeemWater={redeemWater} />
      <AirVessel on:redeemAir={redeemAir} />
    </div>

    <div class="vessels upper-middle">
      <DeckVessel />
    </div>

    <div class="aewonic-cross middle">
      <AewonicCross />
    </div>

    <div class="buttons">
      <ButtonsVessel />
    </div>

    <div class="vessels lower-middle">
      <DiscardVessel />
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

.top, .upper-middle, .lower-middle, .bottom {
  height: 10%;
}



/*
.top {

  position: absolute;
  top: 0;
}

.bottom {
  
  position: absolute;
  bottom: 0;
}*/

</style>