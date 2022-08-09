<script> 
  
  import {  
    affinityAnchor,
    headerQuote,
  } from '../stores.js';

  function handleQuoteClick(){

    // Intention for Quote Header is to be a sort of 
    // inspirational/mood-invoking decorative plate over
    // where the toolset will go when in use, something
    // we can toggle to open which is what this does
    $affinityAnchor = 'toolSet'; //TODO: make this configurable at runtime, so different things can be behind the coverplate at the user's discretion
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