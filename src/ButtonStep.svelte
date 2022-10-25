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

  import { 
    lamentText,
    leMatText,
    leACText,
    leMondeText,
    leNuitText,
    leCEText,
    craftText,
    matriculateText,
    daedalusLabText,
    wellText,
    learnText,
    channardText,
    tzimisceText,
    helpText,
    pruneText,
  } from './hd-constants.js';

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
      {leMatText}
    </a>

  </div>


  <div class='link-div'>

    <a href="?passPhrase=leAC">
      {leACText}
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=leMonde">
      {leMondeText}
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=leNuit">
      {leNuitText}
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=leCE">
      {leCEText}
    </a>

  </div>

  <div class='link-div'>

    <a href="?passPhrase=lament">
      {lamentText}
    </a>

  </div>

  <div class='link-div'>

    <a href="?passPhrase=craft">
      {craftText}
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=matriculate">
      {matriculateText}
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=daedalusLab">
      {daedalusLabText}
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=well">
      {wellText}
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=learn">
      {learnText}
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=lament">
      {lamentText}
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=Channard">
      {channardText}
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=Tzimisce">
      {tzimisceText}
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=help">
      {helpText}
    </a>

  </div>
  
  <div class='link-div'>

    <a href="?passPhrase=prune">
      {pruneText}
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