<script> 
  
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');

  import NamingCup from './NamingCup.svelte';


  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import {  
    passPhrase,
    devMode, 
  } from '../stores.js';

  import {  
    boardName,
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

  function handleNamingCupClick(){
    $passPhrase = 'matriculate_naming-cup';
  }

  initialize();

  function initialize(){
    

    if($devMode){
      
      $boardName = 'NamingCup';
    }
  }


</script>



<div class='main'>

  {#if $passPhrase.startsWith('matriculate_naming-cup')}

    <NamingCup />

  {:else}

    <div class='joseph-daedalus'>
      
        <div class="board">
          <a 
            href="#matriculate_naming-cup"
            on:click={handleNamingCupClick}
          > 
            Liber Nomos 
          </a>
        </div>
        
      
    </div>

  {/if}

</div>

<style>

.joseph-daedalus {
  border: solid;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.board {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}

</style>