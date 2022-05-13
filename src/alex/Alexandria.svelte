<script>
  
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import {  
    passPhrase,
    devMode, 
  } from '../stores.js';

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

  function handleBoardACClick(){
    $passPhrase = 'leAC';
    close();
  }

  function handleBoardMatClick(){
    $passPhrase = 'leMat';
    close();
  }

  function handleBoardMondeClick(){
    $passPhrase = 'leMonde';
    close();
  }

  function handleBoardNuitClick(){
    $passPhrase = 'leNuit';
    close();
  }

  function handleBoardCEClick(){
    $passPhrase = 'leCE';
    close();
  }

</script>

<div class='daedalus-lab'>
  
    <div class="lab-item">
      <a 
        href="#boardAC"
        on:click={handleBoardACClick}
      > 
        Board AC 
      </a>
    </div>
    <div class="lab-item">
      <a 
        href="#boardMat"
        on:click={handleBoardMatClick}
      > 
        Board Mat 
      </a>
    </div>
    <div class="lab-item">
      <a 
        href="#boardMonde"
        on:click={handleBoardMondeClick}
      > 
        Board Monde 
      </a>
    </div>
    <div class="lab-item">
      <a 
        href="#boardNuit"
        on:click={handleBoardNuitClick}
      > 
        Board Nuit 
      </a>
    </div>
    <div class="lab-item">
      <a 
        href="#boardCE"
        on:click={handleBoardCEClick}
      > 
        Board CE 
      </a>
    </div>
  
</div>

<style>

.daedalus-lab {
  border: solid;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.lab-item {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}

</style>