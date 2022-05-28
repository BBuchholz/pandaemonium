<script>
  
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import {  
    passPhrase,
    devMode, 
  } from '../stores.js';

  import { adverbs } from './adverbs.js';
  import { adjectives } from './adjectives.js';
  import { nouns } from './nouns.js';

  import { Djehuti } from '../myriad/Djehuti.js';
  const thothMagus = new Djehuti();

  function notifyCopied(textToWrite){
    addNotification({
      position: 'top-right',
      text: 'copied: ' + textToWrite,
      type: 'error',
      description: 'lorem ipsum',
      removeAfter: 3000,
      disableButtons: true,
      disableDescription: true
    });
  }
  
  function notifyCopyError(){
    addNotification({
      position: 'top-right',
      text: 'error copying to clipboard',
      type: 'error',
      description: 'lorem ipsum',
      removeAfter: 4000,
      disableButtons: true,
      disableDescription: true
    });
  }

  function copyName() {

    const textToWrite = 
      thothMagus.generateName(adverbs, adjectives, nouns);

    navigator.clipboard.writeText(textToWrite).then(function() {
    
      /* clipboard successfully set */
      notifyCopied(textToWrite);

    }, function() {
    
      /* clipboard write failed */
      notifyCopyError();
      
    });


  };

</script>

<div class='naming-cup'>
  
    <button 
      on:click={copyName}
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
/*
.lab-item {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}*/

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