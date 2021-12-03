<script>
  
  import { waterCollection } from '../stores.js';

</script>

<div class="elemental-vessel">
  <div class="elemental-vessel-label">Water</div>
  <div class="zodiac-vessel">
    
    <div 
      class="decan-vessel" 
      class:collected={$waterCollection.includes('8C')}
    >
      8
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$waterCollection.includes('9C')}
    >
      9
    </div>
    
    <div 
      class="decan-vessel" 
      class:collected={$waterCollection.includes('10C')}
    >
      10
    </div>

    <div class="zodiac-vessel-label">♓</div>

  </div>

  <div class="zodiac-vessel">

    <div 
      class="decan-vessel" 
      class:collected={$waterCollection.includes('5C')}
    >
      5
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$waterCollection.includes('6C')}
    >
      6
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$waterCollection.includes('7C')}
    >
      7
    </div>

    <div class="zodiac-vessel-label">♏</div>
  
  </div>

  <div class="zodiac-vessel">

    <div 
      class="decan-vessel" 
      class:collected={$waterCollection.includes('2C')}
    >
      2
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$waterCollection.includes('3C')}
    >
      3
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$waterCollection.includes('4C')}
    >
      4
    </div>

    <div class="zodiac-vessel-label">♋</div>

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