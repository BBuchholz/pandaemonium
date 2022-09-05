<script> 


  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  
  function notifyClicked(message){
    addNotification({
      position: 'top-right',
      text: 'Clicked',
      type: 'error',
      description: message,
      removeAfter: 10000,
    });
  }


  import {  
    affinityAnchor,
    passPhrase,
  } from '../stores.js';



</script>

<div class='main'>

  <div class='tool-set'>
    
    <div class="tool">

      <button on:click={() => $affinityAnchor = 'quotidian' }>
        Close
      </button>

      <button on:click={() => notifyClicked('Pruner') }>
        Pruner
      </button>
      <button on:click={() => notifyClicked('Splitter') }>
        Splitter
      </button>
      <button on:click={() => notifyClicked('Viewer') }>
        Viewer
      </button> 
      <button on:click={() => notifyClicked('Keeper') }>
        Keeper
      </button>
      <button on:click={() => notifyClicked('Inspector') }>
        Inspector
      </button>
      <button on:click={() => notifyClicked('Templer') }>
        Templer
      </button>

    </div>
          
  </div>

</div>

<style>

.tool-set {
  border: solid;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.tool {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}

</style>