<script>
  
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();


  import { Djehuti } from './myriad/Djehuti.js';

  const djehuti = new Djehuti();

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

    //log whatever was entered
    //TODO: this is just cowboy coded, elaborate the process
    createThisMarkDown();

    turnMyrKi();
  }


  // Function using fetch to POST to our API endpoint
  function createThisMarkDown() {

    if(!currentMyrKi){
      return;
    }

    const newMarkDown = djehuti.createMDWxrd(currentMyrKi);
    console.log('mark down created', newMarkDown);

    return fetch('/api/wxrds-create', {
      body: JSON.stringify(newMarkDown),
      method: 'POST'
    }).then(response => {
      return response.json()
    })
  }

  function createANewMarkDown(){

    const timestamp = Date.now();

    // create it!
    createThisMarkDown().then((response) => {

      console.log('API response', response)

      const processed = processResponseObject(response);

      console.log('Processed Response Object', processed);

    }).catch((error) => {
      console.log('API error', error)
    })

  }

  function submit(event) {

    if (event.key === 'Enter') {
      handleTurnMyrKiClick();
    }
  } 

  let currentMyrKi = '';

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