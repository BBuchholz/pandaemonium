<script> 
  
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');

  import BenchTaro from './BenchTaro.svelte';

  import DevInfo from './DevInfo.svelte';

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import {  
    passPhrase,
    devMode, 
    affinityKeys,
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

  function handleBenchTaroClick(){
    $benchName = 'benchTaro';
  }

  function addToDo(toDoSource, toDoText){
    $toDos.push(toDoSource + ": " + toDoText);
  }

  initialize();

  function initialize(){
    
    // addToDo('Daedalus.svelte', 'this is a test to do item');
  }


</script>

<div class='main'>

  {#if $affinityKeys}

    Card Key Goes Here

  {:else}

    <div class='daedalus-shop'>
      
        <div class="bench">
          <a 
            href="#Bench"
            on:click={handleBenchTaroClick}
          > 
            Card Affinity Header (copied from Daedalus) 
          </a>
        </div>
        
      
    </div>

  {/if}

</div>

<style>

.daedalus-shop {
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