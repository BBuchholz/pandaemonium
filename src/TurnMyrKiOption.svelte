<script>
  
  import { getContext } from 'svelte';

  import PromptTurnMyrKi from './PromptTurnMyrKi.svelte';

  const { open } = getContext('simple-modal');

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import { 
    currentBook,
    currentBookTitle,
  } from './stores.js';

  function notify(textValue){
    addNotification({
      position: 'top-right',
      text: textValue,
      type: 'error',
      description: 'lorem ipsum',
      removeAfter: 3000,
      disableButtons: true,
      disableDescription: true
    });
  }

  let count = 0;

  function handleOpenBookClick(){
    
    //TODO: Fauna StepInStoneN+1: behind the A, return Apfel for MyrKi if found, else create Apfel for MyrKi

    let newBook = { title: 'Test ' + count };
    $currentBook = newBook;
    count++;
    
    notify('opened book: ' + $currentBookTitle);
  }

  const showPromptTurnMyrKi = () => {
    open(PromptTurnMyrKi);
  };

</script>

<div class="open-book-option">
  
  <a 
    href="#openBook"
    on:click={showPromptTurnMyrKi}
  > 
    Turn MyrKi 
  </a>
</div>

<style>


.open-book-option {
  margin: 10px;
  padding: 10px;
  border: thin solid;
  border-radius: 10px;
}


</style>