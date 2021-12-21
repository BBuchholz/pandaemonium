<script>
  
  import { waterCollection } from '../stores.js';

  import KnechtController from '../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  export let cardKey = '8C';

  let cardSuit = 'C';
  let cardRank = '8';

  $: cardSuit = magisterLudi.parseSuit(cardKey);
  $: cardRank = magisterLudi.parseRank(cardKey, cardSuit);


</script> 

    
    <div  
      class="decan-vessel" 
      class:collected={$waterCollection.includes(cardKey)}
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
    background-color: #a9efef;
    color: #ffffff;
    display: block;
  }

  .wiggle {
    animation: wiggle .15s linear 3;
    background-color: #a9efef;
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