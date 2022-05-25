<script>
  
  // TODO: I want this for passphrase prospero, which
  // will bring to the same place as lament, but will
  // display this quote in stead... 
  const prosperosEpilogue = `
           Now my charms are all o'erthrown,
           And what strength I have's mine own,
           Which is most faint: now, 'tis true,
           I must be here confined by you,
           Or sent to Naples. Let me not,
           Since I have my dukedom got
           And pardon'd the deceiver, dwell
           In this bare island by your spell;
           But release me from my bands
           With the help of your good hands:
           Gentle breath of yours my sails
           Must fill, or else my project fails,
           Which was to please. Now I want
           Spirits to enforce, art to enchant,
           And my ending is despair,
           Unless I be relieved by prayer,
           Which pierces so that it assaults
           Mercy itself and frees all faults.
           As you from crimes would pardon'd be,
           Let your indulgence set me free.`;

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
    $passPhrase = 'learn';
  }
  
  function handleDaedalusClick(){
    $passPhrase = 'craft';
  } 

  function handleMlJkClick(){
    
    // // TODO;
    // notifyWithoutExpire('ML/JK option will become available when we can separate serious speculation from nonchalant play...');

    $passPhrase = 'matriculate';

  } 

</script>

<div class='puzzle-box'>
    
    <div class="facet-face">
      <a 
        href="#learn"
        on:click={handleAlexandriaClick}
      > 
        Alexandria
      </a>
    </div>
    <div class="facet-face">
      <a 
        href="#matriculate"
        on:click={handleMlJkClick}
      > 
        ML/JK
      </a>
    </div>
    <div class="facet-face">
      <a 
        href="#craft"
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