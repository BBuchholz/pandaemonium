<script>
  
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import { earthCollection, selectedEarthSign, moistureIndex, heatIndex } from '../stores.js';
  import { keysTaurus, keysVirgo, keysCapricorn } from '../constants.js';
  import EarthDecanVessel from './EarthDecanVessel.svelte';

  function redeemTaurus() {

    $earthCollection = $earthCollection.filter(cardKey => !keysTaurus.includes(cardKey)); 
    $selectedEarthSign = '';
  }

  function redeemVirgo() {

    $earthCollection = $earthCollection.filter(cardKey => !keysVirgo.includes(cardKey)); 
    $selectedEarthSign = '';
  }

  function redeemCapricorn() {

    $earthCollection = $earthCollection.filter(cardKey => !keysCapricorn.includes(cardKey)); 
    $selectedEarthSign = '';
  }

  function redeemFire(){
    $heatIndex = $heatIndex + 9;
    $moistureIndex = $moistureIndex - 9;
  }

  function redeemWater(){
    $heatIndex = $heatIndex - 9;
    $moistureIndex = $moistureIndex + 9;
  }
  
  function redeemAir(){
    $heatIndex = $heatIndex + 9;
    $moistureIndex = $moistureIndex + 9;
  }

  function redeemEarth(){
    $heatIndex = $heatIndex - 9;
    $moistureIndex = $moistureIndex - 9;
  }

  function setItem(itemKey, itemValue) {
    try {
        let now = new Date();
        let jsonData = JSON.stringify({time: now, data: itemValue});

        window.localStorage.setItem(itemKey, jsonData);
        return true;
    } catch(e) {
        return false;
    }
  }

  function getItem(itemKey) {
    try {
        let jsonObjectString = window.localStorage.getItem(itemKey);
        let parsedData = JSON.parse(jsonObjectString);

        return parsedData.data;
    } catch(e) {
        return null;
    }
  }

  function saveGame(){

    // IN PROGRESS, WILL SAVE TO LOCAL STORAGE AND NOTIFY
    let gameData = {someDevStubKey: "just a dev stub"};
    if(setItem("gameData", gameData)){
      notifyWithoutExpire("saved to local storage");
    } else {
      notifyWithoutExpire("error saving to local storage");
    }
  }

  function generateDaedalusLabUrl(){

    return "https://pandaemonium.studio/?passPhrase=daedalus";
  }

  function loadGame(){

    const gameData = getItem("gameData");
    if(gameData){
      notifyWithoutExpire("loaded " + JSON.stringify(gameData));
    } else {
      notifyWithoutExpire("no saved data found");
    }
  }

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

</script>

<div class="planar-buttons">

    <button on:click={redeemFire} >Redeem Fire</button>
    <button on:click={redeemWater} >Redeem Water</button>
    <button on:click={redeemAir} >Redeem Air</button>
    <button on:click={redeemEarth} >Redeem Earth</button>
    <button on:click={saveGame} >Save Game</button>
    <button on:click={loadGame} >Load Game</button>

    <a href={generateDaedalusLabUrl()} target="_blank">Daedalus Lab</a>
  
</div>
<div class="elemental-vessel">
  <div class="elemental-vessel-label">Library</div>
  <div class="zodiac-vessel">
    
    {#each keysVirgo as cardKey, i}

      <EarthDecanVessel {cardKey}/>

    {/each}

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedEarthSign = 'Virgo' }>
      ♍    
      </button>
    
    </div>

  </div>

  <div class="zodiac-vessel">

    {#each keysTaurus as cardKey, i}

      <EarthDecanVessel {cardKey}/>

    {/each}

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedEarthSign = 'Taurus' }>
      ♉    
      </button>
    
    </div>
  
  </div>

  <div class="zodiac-vessel">

    {#each keysCapricorn as cardKey, i}

      <EarthDecanVessel {cardKey}/>

    {/each}

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedEarthSign = 'Capricorn' }>
      ♑    
      </button>
    
    </div>

  </div>

  {#if $selectedEarthSign === 'Taurus'}
  
    <button on:click={redeemTaurus} >Redeem Taurus</button>
  
  {:else if $selectedEarthSign === 'Capricorn'}
  
    <button on:click={redeemCapricorn} >Redeem Capricorn</button>
  
  {:else if $selectedEarthSign === 'Virgo'}

    <button on:click={redeemVirgo} >Redeem Virgo</button>
  
  {/if}

</div>

<style>

  .elemental-vessel {
    background-color: '#ffffff';
  }
  
  .zodiac-vessel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }

</style>