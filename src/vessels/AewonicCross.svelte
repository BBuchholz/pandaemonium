<script>

  ///////////////////////////////////////////////////////////
  //
  // NB: This feels like the way they should be broken up, at 
  //     least for the time being.
  //     Stick to this until further notice, and if anything 
  //     DOES needs to change, do it in accordance 
  //     with this division of responsibility
  //
  //     When something better presents itself, 
  //     change it here as well (and in ButtonsVessel)
  //
  ///////////////////////////////////////////////////////////
  
  import { 
    selectedQuadrant,
    beforeGame,
    selectedCards,
    selectionIsSingular,
    selectionResolutionValue, 
    turnFinished,
    selectedCardsForDaemon,
    selectedCardsForPlayer,
  } from '../stores.js';

  import {
    deck,
    aewonicCross,
    buttonCounts,
    collectedSpirit,
    collectedRecentlyWater,
    collectedRecentlyAir,
    collectedRecentlyEarth,
    collectedRecentlyFire,
    waterColCountChanged,
    airColCountChanged,
    earthColCountChanged,
    fireColCountChanged,
    waterCollection,
    airCollection,
    earthCollection,
    fireCollection,
  } from './stores.js';
 
  import Card from './ModCard.svelte';

  import { Knechtor } from '../myriad/Knechtor.js';
  const magisterLudi = new Knechtor();

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  function notifyClicked(title, description){
    addNotification({
      position: 'top-right',
      text: title,
      type: 'info',
      description: description,
      removeAfter: 4000,
    });
  }

  function notifySelectionResolutionValue(){
    addNotification({
      position: 'bottom-right',
      text: 'collected ' + $selectionResolutionValue,
      type: 'error',
      description: 'lorem ipsum',
      removeAfter: 4000,
    });
  }

  function handlePlayerCardClicked(cardKey){

    if($selectedCardsForPlayer.includes(cardKey)){

      $selectedCardsForPlayer = 
        $selectedCardsForPlayer.filter(cKey => cKey !== cardKey);

    }else{

      if($selectionIsSingular){
        
        $selectedCardsForPlayer = [cardKey];

      }else{

        $selectedCardsForPlayer = 
          [...$selectedCardsForPlayer, cardKey];

      }

    }

  }

  function handleDaemonCardClicked(cardKey){

    if($selectedCardsForDaemon.includes(cardKey)){

      $selectedCardsForDaemon = $selectedCardsForDaemon.filter(cKey => cKey !== cardKey);

    }else{
    
      if($selectionIsSingular) {

        $selectedCardsForDaemon = [cardKey];

      }else{
        
        $selectedCardsForDaemon = 
          [...$selectedCardsForDaemon, cardKey];
      }
    }

  }


  // function handleCardClicked(event) {

  //   let title = 'clicked ' + event.detail.cardKey;
  //   let description = 'cardMode: ' + event.detail.cardMode;
  //   description += " cardState: " + event.detail.cardState;
  //   description += " message: " + event.detail.message;
  //   const cardKey = event.detail.cardKey;

  //   handleClickPreviousImplementation(cardKey);

  // }



</script>

<div 
  class="witches-cradle" 
>



  <div 
    class="daemon-cards">

    <div 
      class="card-stead"
      class:hidden={!$aewonicCross[0]}
    >  

      <Card
        cardKey={$aewonicCross[0]}
        i=0
        on:cardClicked={handleDaemonCardClicked($aewonicCross[0])}
      />

    </div>
    
    <div 
      class="card-stead"
      class:hidden={!$aewonicCross[2]}
    >

      <Card
        cardKey={$aewonicCross[2]}
        i=1
        on:cardClicked={handleDaemonCardClicked($aewonicCross[2])}
      />

    </div>
    
    <div 
      class="card-stead"
      class:hidden={!$aewonicCross[4]}
    >

      <Card
        cardKey={$aewonicCross[4]}
        i=2
        on:cardClicked={handleDaemonCardClicked($aewonicCross[4])}
      />

    </div>

  </div>  

  <div 
    class="player-cards"
  >

    <div 
      class="card-stead"
      class:hidden={!$aewonicCross[1]}
    >

      <Card 
        cardKey={$aewonicCross[1]}
        i=0
        on:cardClicked={handlePlayerCardClicked($aewonicCross[1])}
      />
    
    </div>
    
    <div 
      class="card-stead"
      class:hidden={!$aewonicCross[3]}
    >

      <Card 
        cardKey={$aewonicCross[3]}
        i=1
        on:cardClicked={handlePlayerCardClicked($aewonicCross[3])}
      />

    </div>
      
    <div 
      class="card-stead"
      class:hidden={!$aewonicCross[5]}
    >

      <Card 
        cardKey={$aewonicCross[5]}
        i=2
        on:cardClicked={handlePlayerCardClicked($aewonicCross[5])}
      />

    </div>
    

  </div>  






</div>

<style>

.witches-cradle {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-flow: column;
}

.card-stead {
  opacity: 1;
  margin: 20px 10px;
  width: 95%;
  height: 95%;
  max-height: 250px;
  max-width: 150px;
  padding: 3px;
  color: black;
  font-size: 14px;
  line-height: 18px;
  font-weight: bold;
  position: relative;
  border-radius: 3%;
  box-sizing: border-box;
  text-align: center;
  transition: all .15s ease-out;
  box-shadow: 0px 5px 5px rgba(0,0,0,.3);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-flow: column;
}

.elemental-vessels {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-flow: row;
}

.daemon-cards {
  display: flex;
  flex-flow: row;
}

.player-cards {
  display: flex;
  flex-flow: row;
}

.hidden {
  visibility: hidden;
}

button.next-turn {
  position: absolute;
  transition: all .15s ease-out;
  background: black;
  display: block;
}

button.start-game {
  background: black;
  display: block;
  align-items: center;
}

button.dealTwoTrees {
  background: black;
  position: absolute;
  z-index: 7;
}

button.confirmSelection {
  background: black;
  display: inline-block;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  position: absolute;
}

button.beforeGame {
  display: block;
  align-items: center;
}

button:hover {
  transform: scale(1.03);
}

button:active {
  transform: scale(.97);
}

button {
  font-size: 20px;
  margin: 0.5em;
  line-height: 20px;
  padding: 5px 22px 5px 22px;
  box-sizing: border-box;
  font-weight: 600;
  border: solid 3px white;
  color: white;
  background: transparent;
  border-radius: 30em;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
}

button.colorWater {
  font-size: 15px;
  line-height: 15px;
  padding: 8px 22px 9px 22px;
  box-sizing: border-box;
  font-weight: 700;
  border: solid 3px darkgray;
  color: black;
  background-color: #a9efef;
  border-radius: 30px;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
}

button.colorAir {
  font-size: 15px;
  line-height: 15px;
  padding: 8px 22px 9px 22px;
  box-sizing: border-box;
  font-weight: 700;
  border: solid 3px gray;
  color: black;
  background-color: #ffca3a;
  border-radius: 30px;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
}

button.colorEarth {
  font-size: 15px;
  line-height: 15px;
  padding: 8px 22px 9px 22px;
  box-sizing: border-box;
  font-weight: 700;
  border: solid 3px lightgray;
  color: black;
  background-color: #e16036;
  border-radius: 30px;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
}

button.colorFire {
  font-size: 15px;
  line-height: 15px;
  padding: 8px 22px 9px 22px;
  box-sizing: border-box;
  font-weight: 700;
  border: solid 3px white;
  color: white;
  background-color: #e3170a;
  border-radius: 30px;
  transition: all ease-out .2s;
  cursor: pointer;
  outline: none;
  animation: buttonPulse .2s infinite ease-in-out;
}

</style> 