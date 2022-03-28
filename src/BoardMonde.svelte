<script>

  import KnechtController from './myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  import Card from './boardMat/Card.svelte';
  import WaterVessel from './vessels/WaterVessel.svelte';
  import AirVessel from './vessels/AirVessel.svelte';
  import EarthVessel from './vessels/EarthVessel.svelte';
  import FireVessel from './vessels/FireVessel.svelte';
  
  import { 
    passPhrase,
    devMode,
  } from './stores.js';

  import {
    waterCollection,
    airCollection,
    earthCollection,
    fireCollection
  } from './vessels/stores.js'

  import { 
    deck,
    selectedCardsForDaemon,
    selectionIsSingular,
    singleSteadCardKey
  } from './boardMat/boardMat-stores.js';


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

  function notifyDeckInfo(description){
    addNotification({
      position: 'top-right',
      text: 'Deck Info',
      type: 'info',
      description: description,
      removeAfter: 4000,
    });
  }

  function handleCardClicked(){

    if($selectedCardsForDaemon.includes($singleSteadCardKey)){

      $selectedCardsForDaemon = $selectedCardsForDaemon.filter(cKey => cKey !== $singleSteadCardKey);

    }else{
    
      if($selectionIsSingular) {

        $selectedCardsForDaemon = [$singleSteadCardKey];

      }else{
        
        $selectedCardsForDaemon = 
          [...$selectedCardsForDaemon, $singleSteadCardKey];
      }
    }

  }

  function dealRandomCard(){


    if($deck.length == 0){
      
      notifyDeckInfo('Out of Cards, reshuffling');
      $deck = magisterLudi.dealTwelveTrees();
    }

    //select one
    $singleSteadCardKey = $deck.pop();

  }

  initialize();

  function initialize(){

    if($passPhrase === 'leMonde'){
      notifyPassPhraseFound();

      if(!$devMode){
        $devMode = true;
      }
    }

    if($devMode){

      notifyDevMode();

      $waterCollection = [
        '1C', '2C', '3C', 
        '4C', '5C', //'6C',
        '7C', '8C', '9C'
      ];

      $airCollection = [
        '1S', '2S', '3S', 
        '4S', '5S', //'6S',
        '7S', '8S', '9S'
      ];

      $earthCollection = [
        '1D', '2D', '3D', 
        '4D', '5D', //'6D',
        '7D', '8D', '9D'
      ];

      $fireCollection = [
        '1W', '2W', '3W', 
        '4W', '5W', //'6W',
        '7W', '8W', '9W'
      ];


      console.log('waterCollection: ' + $waterCollection);
      console.log('airCollection: ' + $airCollection);
      console.log('earthCollection: ' + $earthCollection);
      console.log('fireCollection: ' + $fireCollection);
    }
  }

</script>

  <div class="game-board">

    <div class="vessels top">
      <WaterVessel />
      <AirVessel />
    </div>

    <div class="aewonic-cross">
      <p>Aewonic Cross Goes Here</p>
    </div>

    <div class="vessels bottom">
      <EarthVessel />
      <FireVessel />
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