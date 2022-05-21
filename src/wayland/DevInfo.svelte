<script>

  import { 
    devMode,
    devNotifyDelay,
  } from '../stores.js';

  import {
    toDos,
  } from './stores.js';

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  function notifyAllToDos(){

    if($toDos.length == 0){
      return;
    }

    let multilineTodos = '';

    for(let i = 0; i < $toDos.length; i++){

      const count = i + 1;
      const todo = $toDos[i];
      multilineTodos += '(' + count + '.) ' + todo; 
    }

    notifyDevInfo('ToDos', multilineTodos, 0);
  }


  function notifyDevInfo(infoTitle, infoDesc, position){

    let removeAfterTime;

    if($devNotifyDelay){

      // NB: position 0 will always be
      // until explicitly closed
      // (THIS IS INTENTIONAL)
      removeAfterTime = position * 300;

    }else{
      
      removeAfterTime = 0;
    }

    addNotification({
      position: 'top-right',
      text: 'Dev Info: ' + infoTitle,
      type: 'error',
      description: infoDesc,
      removeAfter: removeAfterTime,
    });
  }

  export function notifyAllDevInfos(){

    const devInfoTitle1 = 'Template1';

    const devInfoText1 = 
      'Each item just needs a title and a text, positions' +
      'should increment, use this as a reference.';

    notifyDevInfo(devInfoTitle1, devInfoText1, 1);


    const devInfoTitle2 = 'Template2';

    const devInfoText2 = 
      'Each item just needs a title and a text, positions' +
      'should increment, use this as a reference.';

    notifyDevInfo(devInfoTitle2, devInfoText2, 2);


    const devInfoTitle3 = 'Template3';

    const devInfoText3 = 
      'Each item just needs a title and a text, positions' +
      'should increment, use this as a reference.';

    notifyDevInfo(devInfoTitle3, devInfoText3, 3);


    // const devInfoTitle4 = 'Template4';

    // const devInfoText4 = 
    //   'Each item just needs a title and a text, positions' +
    //   'should increment, use this as a reference.';

    // notifyDevInfo(devInfoTitle4, devInfoText4, 4);
  }

  initialize();

  function initialize(){

    if($devMode){

      notifyAllDevInfos();

      notifyAllToDos();
    }
  }

</script>