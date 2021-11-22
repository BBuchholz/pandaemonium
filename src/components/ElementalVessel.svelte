<script>
  
  export let cardinalSign = "C";
  export let fixedSign = "F";
  export let mutableSign = "M";

</script>

<div class="elemental-vessel">
  <div class="zodiac-vessel">
    <div class="decan-vessel">8</div>
    <div class="decan-vessel">9</div>
    <div class="decan-vessel">10</div>
    {mutableSign}
  </div>
  <div class="zodiac-vessel">
    <div class="decan-vessel">5</div>
    <div class="decan-vessel">6</div>
    <div class="decan-vessel">7</div>
    {fixedSign}
  </div>
  <div class="zodiac-vessel">
    <div class="decan-vessel">2</div>
    <div class="decan-vessel">3</div>
    <div class="decan-vessel">4</div>
    {cardinalSign}
  </div>
</div>

<style>
  
  .zodiac-vessel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .decan-vessel {
    padding: 5px;
  }

</style>