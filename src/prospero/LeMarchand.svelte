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

  function handleMlJkClick(){
    notifyWithoutExpire('ML/JK option will become available when we can separate serious speculation from nonchalant play...');
  } 

</script>

<div class='puzzle-box'>
    
    <div class="facet-face">
      <a 
        href="#Alexandria"
        on:click={handleAlexandriaClick}
      > 
        Alexandria
      </a>
    </div>
    <div class="facet-face">
      <a 
        href="#MLJK"
        on:click={handleMlJkClick}
      > 
        ML/JK
      </a>
    </div>
    <div class="facet-face">
      <a 
        href="#DaedalusLab"
        on:click={handleDaedalusClick}
      > 
        Daedalus
      </a>
    </div>
  
</div>

<style>

.puzzle-box {
  border: solid;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.facet-face {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}

</style>