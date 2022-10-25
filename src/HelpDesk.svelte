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
      Check out the <a href="https://youtu.be/l9m-q0c6l_M">Help Desk Intro</a> video notes for details. (What's a Video Note? We've posted an explanation video <a href="https://youtu.be/CIekmoVgJ_4">here</a> to clarify)
    </p>

    <p>
      {lamentText}
    </p>

    <!-- TODO: replace all these with constants, do buttonstep also! -->

    <p>
      {craftText}
    </p>
    
    <p>
      {leACText}
    </p>
    
    <p>
      {matriculateText}
    </p>
    
    <p>
      {daedalusLabText}
    </p>
    
    <p>
      {wellText}
    </p>
    
    <p>
      {leMatText}
    </p>
    
    <p>
      {learnText}
    </p>
    
    <p>
      {lamentText}
    </p>
    
    <p>
      {leMondeText}
    </p>
    
    <p>
      {leNuitText}
    </p>
    
    <p>
      {leCEText}
    </p>
    
    <p>
      {channardText}
    </p>
    
    <p>
      {tzimisceText}
    </p>
    
    <p>
      {helpText}
    </p>
    
    <p>
      {pruneText}
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