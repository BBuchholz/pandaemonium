<script>

  import KnechtController from '../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  import Card from './Card.svelte';
  
  import { 
    passPhrase,
  } from '../stores.js';

  import { 

    selectedCardsForDaemon,
    selectionIsSingular,
    singleSteadCardKey,
    deck,
  } from './stores.js';


  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  
  import { getContext } from 'svelte';

  import LibraryPopup from '../LibraryPopup.svelte';

  const { open } = getContext('simple-modal');

  const showPopupLong = () => {
    open(LibraryPopup);
  };

  function notifyPassPhraseFound(){
    addNotification({
      position: 'top-right',
      text: 'passPhrase Found',
      type: 'error',
      description: 'passPhrase: ' + $passPhrase,
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
    
    console.log('1');
      if($selectionIsSingular) {

    console.log($selectedCardsForDaemon);
        $selectedCardsForDaemon = [$singleSteadCardKey];

    console.log($selectedCardsForDaemon);
      }else{
        
    console.log('2');
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

    if($passPhrase === 'leMat'){
      notifyPassPhraseFound();
    }
  }

  initialize();

</script>

  <div class="game-board">

    <div class="buttons">

      <button 
        on:click={showPopupLong}
      >
        📓
      </button>

      <button 
        class="deal-button"
        on:click={dealRandomCard}
      >

        Deal

      </button>

    </div>

    <div class="stead">

      <Card 
        cardKey={$singleSteadCardKey}
        on:cardClicked={handleCardClicked} />  

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

.stead {

}

</style>