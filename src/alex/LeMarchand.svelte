<script>
  
  import { getContext } from 'svelte';

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

  function handleAlexandriaClick(){
    $passPhrase = 'alex';
  }
  
  function handleDaedalusClick(){
    $passPhrase = 'daedalus';
  } 

</script>

<div class='daedalus-lab'>
    
    <div class="lab-item">
      <a 
        href="#Alexandria"
        on:click={handleAlexandriaClick}
      > 
        Alexandria
      </a>
    </div>
    <div class="lab-item">
      <a 
        href="#DaedalusLab"
        on:click={handleDaedalusClick}
      > 
        Daedalus
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