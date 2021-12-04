<script>
  
  import { airCollection } from '../stores.js';

  import KnechtController from '../myriad/KnechtController.js';
  const magisterLudi = KnechtController();

  export let cardKey = '8S';

  let cardSuit = 'S';
  let cardRank = '8';

  $: cardSuit = magisterLudi.parseSuit(cardKey);
  $: cardRank = magisterLudi.parseRank(cardKey, cardSuit);


</script> 

    
    <div  
      class="decan-vessel" 
      class:collected={$airCollection.includes(cardKey)}
    >
      <a href={"https://dark-shadow-sun-fire.netlify.app/?cardKey=" + cardKey} target="_blank">{cardRank}</a>
    </div>

<style> 

  .decan-vessel {
    margin: 5px;
    padding: 5px;
    border-style: double;
    border-radius: 10px;
  }

  .collected {
    background-color: #000000;
    color: #ffffff;
  }

</style>