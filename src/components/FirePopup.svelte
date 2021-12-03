<script>
  
  import { fireCollection } from '../stores.js';

</script>

<div class="elemental-vessel">
  <div class="elemental-vessel-label">Fire</div>
  <div class="zodiac-vessel">
    
    <div 
      class="decan-vessel" 
      class:collected={$fireCollection.includes('8W')}
    >
      8
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$fireCollection.includes('9W')}
    >
      9
    </div>
    
    <div 
      class="decan-vessel" 
      class:collected={$fireCollection.includes('10W')}
    >
      10
    </div>

    <div class="zodiac-vessel-label">♐</div>

  </div>

  <div class="zodiac-vessel">

    <div 
      class="decan-vessel" 
      class:collected={$fireCollection.includes('5W')}
    >
      5
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$fireCollection.includes('6W')}
    >
      6
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$fireCollection.includes('7W')}
    >
      7
    </div>

    <div class="zodiac-vessel-label">♌</div>
  
  </div>

  <div class="zodiac-vessel">

    <div 
      class="decan-vessel" 
      class:collected={$fireCollection.includes('2W')}
    >
      2
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$fireCollection.includes('3W')}
    >
      3
    </div>

    <div 
      class="decan-vessel" 
      class:collected={$fireCollection.includes('4W')}
    >
      4
    </div>

    <div class="zodiac-vessel-label">♈</div>

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