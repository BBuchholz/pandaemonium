<script>

  import { 

    selectedCardsForDaemon,
    selectedCardsForPlayer, 
    aewonicCross,
    deck, 
    currentDeckCount,
    discardCount, 
    nextTurnButtonText,
    turnFinished,
    noValidChoices,
    selectionResolutionValue,
    beforeGame,
    selectionIsValid,
    selectedQuadrant,
    selectedCards,
    selectionIsSingular, 
    buttonCounts,
    waterCollection,
    airCollection,
    earthCollection,
    fireCollection,
    waterColCountChanged,
    airColCountChanged,
    earthColCountChanged,
    fireColCountChanged,
    collectedRecentlyWater,
    collectedRecentlyAir,
    collectedRecentlyEarth,
    collectedRecentlyFire,
    collectedSpirit
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


  // function resetSelection() {

  //   // roundFinished = true;
  //   $selectedCardsForPlayer = [];
  //   $selectedCardsForDaemon = [];
  //   $aewonicCross = [];;
  //   // console.log('selection reset');
  // }

  // function loadDeck(){

  //   $deck = magisterLudi.dealTwelveTrees();
  // }


  // function outOfCards() {

  //   const toReshuffle = $currentDeckCount + $discardCount;

  //   if(toReshuffle > 1) {
   
  //     notifyClicked('Deck Info!', 'out of cards, reshuffling ' + toReshuffle + ' cards...');
  //     loadDeck();
  //     newDeal(); 
    
  //   } else if (toReshuffle === 1) {

  //     notifyClicked('Deck Info!', 'only one card in deck, need to redeem to continue');
  //     $turnFinished = true;

  //   } else {

  //     notifyClicked('Deck Info!', 'all cards collected! you rock!');
  //     $beforeGame = true;

  //   }

  // }

  // function newDeal(){
 
  //   // if($currentDeckCount < 6){

  //   //   loadDeck();
  //   // }

  //   if($deck.length == 0){

  //     outOfCards();
  //     return;
  //   }

  //   $aewonicCross = [];

  //   const cardsToDeal = 6;

  //   while(cardsToDeal > $deck.length){
  //     cardsToDeal -= 2;
  //   }

  //   if(cardsToDeal == 0){

  //     outOfCards();
  //     return;
  //   }

  //   for(let i = 0; i < cardsToDeal; i++){
  //     $aewonicCross = [...$aewonicCross, $deck.pop()];
  //   }

  // }


  // function onStartGame() {

  //   $beforeGame = false;
  //   newDeal();
  // }

  // function endGame(){
  //   $beforeGame = true;
  //   $selectedQuadrant = '';
  //   // $daemonCards = [];
  //   // $playerCards = [];
  //   $aewonicCross = [];
  // }

  // function onNextTurn() {
    
  //   $turnFinished = false;
  //   $earthColCountChanged = false;
  //   $fireColCountChanged = false;
  //   $airColCountChanged = false;
  //   $waterColCountChanged = false;

  //   $collectedRecentlyFire = [];
  //   $collectedRecentlyWater = [];
  //   $collectedRecentlyAir = [];
  //   $collectedRecentlyEarth = [];
    
  //   newDeal();
  // }

  // function selectionConfirmed() {
    

  //   processCardCollection();

  //   $turnFinished = true;
  // }

  // function processCardCollection() {

  //   console.log('res: ' + $selectionResolutionValue);
  //   console.log('length: ' + $selectionResolutionValue.length);

  //   for(const cardKey of $selectionResolutionValue){

  //     console.log('cardkey: ' + cardKey);

  //     let cardSuit = magisterLudi.parseSuit(cardKey);

  //     console.log('cardSuit: ' + cardSuit);

  //     if(cardSuit === 'D'){
        
  //       if(!$earthCollection.includes(cardKey)){
          
  //         $earthCollection = [...$earthCollection, cardKey];
  //         $earthColCountChanged = true;
  //         $collectedRecentlyEarth = [...$collectedRecentlyEarth, cardKey];
  //       }
        
        
  //     }

  //     if(cardSuit === 'W'){
        
  //       if(!$fireCollection.includes(cardKey)){
          
  //         $fireCollection = [...$fireCollection, cardKey];
  //         $fireColCountChanged = true;
  //         $collectedRecentlyFire = [...$collectedRecentlyFire, cardKey];
  //       }
        
  //     }

  //     if(cardSuit === 'S'){
        
  //       if(!$airCollection.includes(cardKey)){
          
  //         $airCollection = [...$airCollection, cardKey];
  //         $airColCountChanged = true;
  //         $collectedRecentlyAir = [...$collectedRecentlyAir, cardKey];
  //       }
        
  //     }

  //     if(cardSuit === 'C'){
        
  //       if(!$waterCollection.includes(cardKey)){
          
  //         $waterCollection = [...$waterCollection, cardKey];
  //         $waterColCountChanged = true;
  //         $collectedRecentlyWater = [...$collectedRecentlyWater, cardKey];
  //       }
        
  //     }
  //   }

  //   notifySelectionResolutionValue();

  //   resetSelection();
  //   // console.log('card comparison processed');
  // }

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