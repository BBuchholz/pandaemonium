<script>

  import KnechtController from '../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  import Card from './Card.svelte';
  import WaterVessel from './WaterVessel.svelte';
  import AirVessel from './AirVessel.svelte';
  import EarthVessel from './EarthVessel.svelte';
  import FireVessel from './FireVessel.svelte';
  import AewonicCross from './AewonicCross.svelte';
  import ButtonsVessel from './ButtonsVessel.svelte';
  import DeckVessel from './DeckVessel.svelte';
  import DiscardVessel from './DiscardVessel.svelte';
   
  import {
    passPhrase,
    devMode,
    selectedQuadrant,
  } from '../stores.js';

  import { 
    keysWater, 
    keysAir, 
    keysEarth, 
    keysFire,
  } from '../constants.js';

  
  import {
    deck,
    // discardCount,
    waterCollection,
    airCollection,
    earthCollection,
    fireCollection,
    collectedSpirit,
  } from './stores.js'

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

    <div class="water-vessel">
      <WaterVessel on:redeemWater={redeemWater} />
    </div>

    <div class="air-vessel">
      <AirVessel on:redeemAir={redeemAir} />
    </div>

    <div class="deck-vessel">
      <DeckVessel />
    </div>

    <div class="ac-vessel">
      <AewonicCross />
    </div>

    <div class="buttons-vessel">
      <ButtonsVessel />
    </div>

    <div class="discard-vessel">
      <DiscardVessel />
    </div>

    <div class="earth-vessel">
      <EarthVessel on:redeemEarth={redeemEarth} />
    </div>

    <div class="fire-vessel">
      <FireVessel on:redeemFire={redeemFire} />
    </div>

  </div> 


<style>

/* REF-USED: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout */

.game-board {
  
  border: solid;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  gap: 10px;
}

.water-vessel {
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  grid-column: 1/4;
  grid-row: 1;
}

.air-vessel {
  
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  grid-column: 4/7;
  grid-row: 1;
}

.deck-vessel {
  
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  grid-column: 1/7;
  grid-row: 4;
}

.ac-vessel {
  
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  grid-column: 1/7;
  grid-row: 3;
}

.buttons-vessel {
  

  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  grid-column: 1/7;
  grid-row: 2;
}

.discard-vessel {
  

  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  grid-column: 1/7;
  grid-row: 5;
}

.earth-vessel {
  

  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  grid-column: 1/4;
  grid-row: 6;
}


.fire-vessel {


  display: flex;
  align-items: center;
  justify-content: center;  
  border: solid;
  grid-column: 4/7;
  grid-row: 6;
}

</style>