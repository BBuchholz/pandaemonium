<script> 
  
  import {  
    affinityAnchor,
    passPhrase,
    headerQuote,
  } from '../stores.js';

  function handleQuoteClick(){

    if($passPhrase === 'Channard'){
      $affinityAnchor = 'toolSet';
    }

    if($passPhrase === 'Tzimisce'){
      $affinityAnchor = 'mdmdm';
    }
  }

</script>

<div class='main'>


  <div class='quote-header'>
    
      <div class="bench">
        <a 
          href="#Bench"
          on:click={handleQuoteClick}
        > 
           
          <p>
          
            {$headerQuote.content}
          
          </p>
          
          {#if $headerQuote.source}

            <p>

              - {$headerQuote.source}

            </p>

          {/if}

        </a>
      </div>
      
    
  </div>

</div>

<style>

.quote-header {
  border: solid;
  border-radius: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.bench {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}

</style>