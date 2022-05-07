<script>
  
  import { 
    earthCollection, 
    collectedRecentlyEarth, 
  } from './stores.js';

  import { 
    Knechtor, 
  } from '../myriad/Knechtor.js';

  const magisterLudi = new Knechtor();

  export let cardKey = '10D';

  let cardSuit;
  let cardRank;

  initialize();

  function initialize(){

    cardSuit = magisterLudi.parseSuit(cardKey);
    cardRank = magisterLudi.parseRank(cardKey, cardSuit);

    console.log('cardKey ' + cardKey);
    console.log('cardSuit ' + cardSuit);
    console.log('cardRank ' + cardRank);

  }

</script> 

    
    <div  
      class="decan-vessel" 
      class:collected={$earthCollection.includes(cardKey) || cardKey === '10D'}
      class:wiggle={ $collectedRecentlyEarth.includes(cardKey)}
    >
      <a href={"https://dark-shadow-sun-fire.netlify.app/?cardKey=" + cardKey} target="_blank">{cardRank}</a>
    </div>

<style> 

  .decan-vessel {
    margin: 5px;
    padding: 5px;
    border-style: double;
    border-radius: 10px;
    display: none;
  }

  .collected {
    background-color: #e16036;
    color: #ffffff;
    display: block;
  }


  .wiggle {
    animation: wiggle .15s linear 3;
    background-color: #e16036;
  }


  @keyframes wiggle {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0);
    }
  }

</style>