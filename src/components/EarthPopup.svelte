<script>
  
  import { earthCollection } from '../stores.js';

</script>

<div class="elemental-vessel">
  <div class="elemental-vessel-label">Earth</div>
  <div class="zodiac-vessel">
    
    <div 
      class="decan-vessel" 
      class:collected={$earthCollection.includes('8D')}
    >
      8
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$earthCollection.includes('9D')}
    >
      9
    </div>
    
    <div 
      class="decan-vessel" 
      class:collected={$earthCollection.includes('10D')}
    >
      10
    </div>

    <div class="zodiac-vessel-label">♍</div>

  </div>

  <div class="zodiac-vessel">

    <div 
      class="decan-vessel" 
      class:collected={$earthCollection.includes('5D')}
    >
      5
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$earthCollection.includes('6D')}
    >
      6
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$earthCollection.includes('7D')}
    >
      7
    </div>

    <div class="zodiac-vessel-label">♉</div>
  
  </div>

  <div class="zodiac-vessel">

    <div 
      class="decan-vessel" 
      class:collected={$earthCollection.includes('2D')}
    >
      2
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$earthCollection.includes('3D')}
    >
      3
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$earthCollection.includes('4D')}
    >
      4
    </div>

    <div class="zodiac-vessel-label">♑</div>

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