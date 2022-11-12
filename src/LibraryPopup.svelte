<script>
  
  import { getContext } from 'svelte';

  const { close } = getContext('simple-modal');

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import { 
    moistureIndex, 
    heatIndex, 
    passPhrase,
    devMode, 
    voidMode,
    requestedInitialDeal,
  } from './stores.js';

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
  
  function handleDaedalusLabClick(){
    $passPhrase = 'daedalus';
    close();
  }

  function enterDevMode(){
    $devMode = true;
    close();
  }

  function enterVoidMode(){
    $voidMode = true;
    close();
  }

</script>

<div class="planar-buttons">

    <button on:click={redeemFire} >Redeem Fire</button>
    <button on:click={redeemWater} >Redeem Water</button>
    <button on:click={redeemAir} >Redeem Air</button>
    <button on:click={redeemEarth} >Redeem Earth</button>
    <button on:click={saveGame} >Save Game</button>
    <button on:click={loadGame} >Load Game</button>
    <button on:click={enterDevMode} >Enter Dev Mode</button>
    <button on:click={enterVoidMode} >Enter Void Mode</button>
    <p>Dev Mode is {$devMode}</p>
    <p>Void Mode is {$voidMode}</p>


    <p>This is an open source project based on another under GPL licensing, and subject to those conditions, contact me through the github site, hosted at <a href='https://github.com/BBuchholz/pandaemonium'>github.com/BBuchholz/pandaemonium</a>, for details </p>
  
</div>
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
    <div class="lab-item">
      <a 
        href="#DaedalusLab"
        on:click={handleDaedalusLabClick}
      > 
        Daedalus Lab 
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