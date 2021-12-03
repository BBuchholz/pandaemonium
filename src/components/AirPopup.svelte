<script>
  
  import { airCollection } from '../stores.js';

</script>

<div class="elemental-vessel">
  <div class="elemental-vessel-label">Air</div>
  <div class="zodiac-vessel">
    
    <div 
      class="decan-vessel" 
      class:collected={$airCollection.includes('8S')}
    >
      8
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$airCollection.includes('9S')}
    >
      9
    </div>
    
    <div 
      class="decan-vessel" 
      class:collected={$airCollection.includes('10S')}
    >
      10
    </div>

    <div class="zodiac-vessel-label">♊</div>

  </div>

  <div class="zodiac-vessel">

    <div 
      class="decan-vessel" 
      class:collected={$airCollection.includes('5S')}
    >
      5
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$airCollection.includes('6S')}
    >
      6
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$airCollection.includes('7S')}
    >
      7
    </div>

    <div class="zodiac-vessel-label">♒</div>
  
  </div>

  <div class="zodiac-vessel">

    <div 
      class="decan-vessel" 
      class:collected={$airCollection.includes('2S')}
    >
      2
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$airCollection.includes('3S')}
    >
      3
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$airCollection.includes('4S')}
    >
      4
    </div>

    <div class="zodiac-vessel-label">♎</div>

  </div>

</div>

<style>

  .elemental-vessel {
    background-color: '#ffffff';
  }
  
  .zodiac-vessel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

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