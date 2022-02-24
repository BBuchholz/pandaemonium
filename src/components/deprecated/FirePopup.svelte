<script>
  
  import { fireCollection, selectedFireSign } from '../stores.js';
  import FireDecanVessel from './FireDecanVessel.svelte';
  
  function redeemSagittarius() {

    const filterSagittarius = ['8W', '9W', '10W'];
    $fireCollection = $fireCollection.filter(cardKey => !filterSagittarius.includes(cardKey)); 
    $selectedFireSign = '';
  }

  function redeemLeo() {

    const filterLeo = ['5W', '6W', '7W'];
    $fireCollection = $fireCollection.filter(cardKey => !filterLeo.includes(cardKey)); 
    $selectedFireSign = '';
  }

  function redeemAries() {

    const filterAries = ['2W', '3W', '4W'];
    $fireCollection = $fireCollection.filter(cardKey => !filterAries.includes(cardKey)); 
    $selectedFireSign = '';
  }

</script>

<div class="elemental-vessel">
  <div class="elemental-vessel-label">Fire</div>
  <div class="zodiac-vessel">
    
    <FireDecanVessel cardKey="8W" />

    <FireDecanVessel cardKey="9W"/>

    <FireDecanVessel cardKey="10W"/>

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedFireSign = 'Sagittarius' }>
      ♐    
      </button>
    
    </div>

  </div>

  <div class="zodiac-vessel">

    <FireDecanVessel cardKey="5W"/>

    <FireDecanVessel cardKey="6W"/>

    <FireDecanVessel cardKey="7W"/>

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedFireSign = 'Leo' }>
      ♌    
      </button>
    
    </div>
  
  </div>

  <div class="zodiac-vessel">

    <FireDecanVessel cardKey="2W"/>

    <FireDecanVessel cardKey="3W"/>

    <FireDecanVessel cardKey="4W"/>

    <div class="zodiac-vessel-label">

      <button on:click={() => $selectedFireSign = 'Aries' }>
      ♈    
      </button>
    
    </div>

  </div>

  {#if $selectedFireSign === 'Sagittarius'}
  
    <button on:click={redeemSagittarius} >Redeem Sagittarius</button>
  
  {:else if $selectedFireSign === 'Leo'}
  
    <button on:click={redeemLeo} >Redeem Leo</button>
  
  {:else if $selectedFireSign === 'Aries'}

    <button on:click={redeemAries} >Redeem Aries</button>
  
  {/if}
  
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

</style>