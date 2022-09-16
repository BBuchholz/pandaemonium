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

    $devMode = true;

    if($devMode){

      $passPhrase = 'help';
    }
  }

  initialize();

</script>

<div class='main'>

<!-- TODO: single point of entry, have to enter something to get something out, anything less than 100 wxrds should be looked up as a potential alias, increase limit? not found should return a list of things you can do -->

  <div class='citadel-shelf'>
    
    <input 
      bind:value={currentMyrKi} 
      placeholder="enter MyrKi (or 'help')"
      on:keydown={submit} />
    
  </div>

  <div class='citadel-desk'>
      
    <a 
      href="#openBook"
      on:click={handleTurnMyrKiClick}
    > 
      Turn
    </a>
    
  </div>  

  <div class="citadel-desk">

    <p>
      Try "lament" for ...
    </p>

    <p>
      Try 'craft' for ...
    </p>
    
    <p>
      Try 'leAC' for ...
    </p>
    
    <p>
      Try 'matriculate' for ...
    </p>
    
    <p>
      Try 'daedalusLab' for ...
    </p>
    
    <p>
      Try 'well' for ...
    </p>
    
    <p>
      Try 'leMat' for ...
    </p>
    
    <p>
      Try 'learn' for ...
    </p>
    
    <p>
      Try 'lament' for ...
    </p>
    
    <p>
      Try 'leMonde' for ...
    </p>
    
    <p>
      Try 'leNuit' for ...
    </p>
    
    <p>
      Try 'leCE' for ...
    </p>
    
    <p>
      Try 'Channard' for ...
    </p>
    
    <p>
      Try 'Tzimisce' for ...
    </p>
    
    <p>
      Try 'help' for ...
    </p>
    

    <!-- We wanna make more of a game and less of a lesson... -->

  </div>

</div>

<style>

.citadel-shelf, .citadel-desk {
  border: solid;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.flavor-text {
  font-size: small;
}

.book {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}

</style>