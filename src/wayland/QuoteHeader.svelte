<script> 
  
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');

  import DevInfo from './DevInfo.svelte';

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import {  
    passPhrase,
    devMode, 
    headerQuote,
  } from '../stores.js';

  import {  
    benchName,
    toDos,
  } from './stores.js';

  function notifyWithoutExpire(textValue){
    addNotification({
      position: 'bottom-right',
      text: textValue,
      type: 'error',
      description: 'lorem ipsum',
      disableButtons: false,
      disableDescription: true
    });
  }

  function handleQuoteClick(){

  }

  function addToDo(toDoSource, toDoText){
    $toDos.push(toDoSource + ": " + toDoText);
  }

  initialize();

  function initialize(){
    
    addToDo('Daedalus.svelte', 'this is a test to do item');
  }


</script>

<DevInfo toDos={toDos} />

<div class='main'>


  <div class='quote-header'>
    
      <div class="bench">
        <a 
          href="#Bench"
          on:click={handleQuoteClick}
        > 
          
          
          <p>
          
            {$headerQuote.content}
          
          </p>
          
          <p>

            - {$headerQuote.source}

          </p>

        </a>
      </div>
      
    
  </div>

</div>

<style>

.quote-header {
  border: solid;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.bench {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}

</style>