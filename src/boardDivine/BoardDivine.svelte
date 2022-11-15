<script>

  import { fly } from 'svelte/transition';
  let visible = true;

  import KnechtController from '../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  import Card from './Card.svelte';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
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

    // updateAffinities();
  }

  // function updateAffinities(){

  //   dispatch('affinitiesChanged', {
  //     cardKeys: [...$selectedCardsForDaemon]
  //   });    
  // }

  function resetSelection(){
    $selectedCardsForDaemon = [];
    // updateAffinities();
  }

  function dealRandomCard(){



    resetSelection();

    if($deck.length == 0){
      
      notifyDeckInfo('Out of Cards, reshuffling');
      $deck = magisterLudi.dealTwelveTrees();
    }

    //select one
    $singleSteadCardKey = $deck.pop();

  }


</script>

<div class="main">

  <div class="board">
  
    {#if visible}

      <div class="stead" transition:fly="{{ y:200, duration: 2000 }}">

        <Card 
          cardKey={$singleSteadCardKey}
          on:cardClicked={handleCardClicked} />  

      </div>

    {/if}
  
  </div> 

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

    <label>
      <input type="checkbox" bind:checked={visible}>
      visible
    </label>

  </div>

</div>


<style>

.main {
  display: flex;
  flex-direction: column;
}

.board {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.stead {

}

</style>