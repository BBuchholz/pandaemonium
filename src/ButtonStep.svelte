<script>
  
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import { 
    // currentBookTitle,
    passPhrase,
    devMode,
  } from './stores.js';

  // import TurnMyrKiOption from './TurnMyrKiOption.svelte';

  function notify(textValue){
    addNotification({
      position: 'top-right',
      text: textValue,
      type: 'error',
      description: 'lorem ipsum',
      removeAfter: 3000,
      disableButtons: true,
      disableDescription: true
    });
  }

  function turnMyrKi() {

    $passPhrase = currentMyrKi;
    currentMyrKi = '';
  }
  
  function handleTurnMyrKiClick(){

    if(!currentMyrKi){
      notify('name cannnot be empty');
      return;
    }
    
    turnMyrKi();
  }

  function submit(event) {

    if (event.key === 'Enter') {
      handleTurnMyrKiClick();
    }
  }

  let currentMyrKi = '';

  function initialize(){

  }

  initialize();

</script>

<div class='main'>
 
<!-- TODO: single point of entry, have to enter something to get something out, anything less than 100 wxrds should be looked up as a potential alias, increase limit? not found should return a list of things you can do --> 


  <div class="info-header">

    <p>
      Any one of the phrases below can be entered as a shortcut, and will navigate if set as a url parameter (so you're current spot in the studio can be bookmarked). As you can see, there's quite a few buttons (in no particular order), so the text input on the doorstep is actually by design, as you find your way around you won't need to see the entire list to find what you're seeking...
    </p>

  </div>


  
  <div class='link-div'>

    <a href="?passPhrase=leMat">
      Try 'leMat' for single card layout that deals a random card upon request (named for the Fool card in the Marseilles deck)
    </a>

  </div>


  <div class='link-div'>

    <a href="?passPhrase=leAC">
      Try 'leAC' for the very first version of the Tarot game we are currently working on.
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=leMonde">
      Try 'leMonde' for a variant layout based on the World Card of the Marseilles deck that uses similar interaction rules to BoardAC (passPhrase 'leAC');
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=leNuit">
      Try 'leNuit' for an experimental variation of what we started in leMonde.
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=leCE">
      Try 'leCE' for ...
    </a>

  </div>

  <div class='link-div'>

    <a href="?passPhrase=lament">
      Try 'lament' for the original library/workshop organizational dichotomy with ML/JK balance point...
    </a>

  </div>

  <div class='link-div'>

    <a href="?passPhrase=craft">
      Try 'craft' to go directly into the Daedalus Shop Floor
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=matriculate">
      Try 'matriculate' to go directly into the ML/JK Balance Point
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=daedalusLab">
      Try 'daedalusLab' for the earlier version of Daedalus (prior to the creation of the Shop Floor concept of work benches for each sub category of development)
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=well">
      Try 'well' for ...
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=learn">
      Try 'learn' for ...
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=lament">
      Try 'lament' for ...
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=Channard' f">
      Try 'Channard' for OpRoom
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=Tzimisce">
      Try 'Tzimisce' for ...
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=help">
      Try 'help' for ...
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=prune">
      Try 'prune' for the MarkDown Completed Task Pruner
    </a>

  </div>

  <!-- We wanna make more of a game and less of a lesson... -->

</div>

<style>

.info-header {
  border: none;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.link-div {
  border: solid;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}


</style>