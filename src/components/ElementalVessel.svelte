<script>
  
  export let cardinalSign = "C";
  export let fixedSign = "F";
  export let mutableSign = "M";
  export let elementLabel = "Element";
  export let color = '#000fff';

</script>

<div class="elemental-vessel" style="--elemental-color: {color}">
  <div class="elemental-vessel-label">{elementLabel}</div>
  <div class="zodiac-vessel">
    <div class="decan-vessel">8</div>
    <div class="decan-vessel">9</div>
    <div class="decan-vessel">10</div>
    <div class="zodiac-vessel-label">{mutableSign}</div>
  </div>
  <div class="zodiac-vessel">
    <div class="decan-vessel">5</div>
    <div class="decan-vessel">6</div>
    <div class="decan-vessel">7</div>
    <div class="zodiac-vessel-label">{fixedSign}</div>
  </div>
  <div class="zodiac-vessel">
    <div class="decan-vessel">2</div>
    <div class="decan-vessel">3</div>
    <div class="decan-vessel">4</div>
    <div class="zodiac-vessel-label">{cardinalSign}</div>
  </div>
</div>

<style>

  .elemental-vessel {
    background-color: var(--elemental-color);
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

</style>