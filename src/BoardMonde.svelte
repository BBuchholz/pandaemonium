<script>

  import KnechtController from './myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  import Card from './boardMat/Card.svelte';
  import WaterVessel from './vessels/WaterVessel.svelte';
  
  import { 
    passPhrase,
    deck 
  } from './stores.js';

  import { 

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
      removeAfter: 10000,
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

  function initialize(){

    if($passPhrase === 'leMonde'){
      notifyPassPhraseFound();
    }
  }

  initialize();

</script>

  <div class="game-board">

    <div class="top-vessels">
      <WaterVessel />
      <p>Air Goes Here</p>
    </div>

    <div class="aewonic-cross">
      <p>Aewonic Cross Goes Here</p>
    </div>

    <div class="bottom-vessels">
      <p>Earth Goes Here</p>
      <p>Fire Goes Here</p>
    </div>

  </div> 


<style>

.game-board {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.top-vessels {

  display: flex;
  flex-flow: row;
  justify-content: space-around;

}

</style>