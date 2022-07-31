<script> 
  
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');

  import BenchTaro from './BenchTaro.svelte';

  import DevInfo from './DevInfo.svelte';
  import QuoteHeader from './QuoteHeader.svelte';
  


  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import {  
    passPhrase,
    devMode, 
    headerQuote,
    affinityAnchor,
  } from '../stores.js';

  import {  
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
    $affinityAnchor = 'benchTaro';
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


<div class='affinity-header'>

  {#if $affinityAnchor === 'cardKey'}

    <CardAffinityHeader />

  {:else}

    <QuoteHeader />

  {/if}

</div>

<style>

.affinity-header {
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