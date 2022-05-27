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
      position: 'top-right',
      text: textValue,
      type: 'error',
      description: 'lorem ipsum',
      disableButtons: false,
      disableDescription: true
    });
  }

  function showPopupLong() {

    const generatedName = 'name goes here';

    notifyWithoutExpire(generatedName);
  }


</script>

<div class='naming-cup'>
  
    <button 
      on:click={showPopupLong}
    >
      Sip
    </button>
    
</div>

<style>

.naming-cup {
  border: none;
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

button {
    font-size: 15px;
    line-height: 15px;
    padding: 8px 22px 8px 22px;
    box-sizing: border-box;
    font-weight: 700;
    border: solid 3px lightgray;
    color: black;
    background-color: #BEBEBE;
    border-radius: 30px;
    transition: all ease-out .2s;
    cursor: pointer;
    outline: none;
    margin: 5px;
    animation: buttonPulse .2s infinite ease-in-out;
  }

</style>