import { v4 as uuidv4 } from 'uuid';

export class Djehuti {

  static previousTimeStamp;

  constructor(){

  }

  pruneTasks(markdownText){

    //split into lines
    const lines = markdownText.split('\n');
    let newLines = [];

    const trimmed = markdownText.trim();

    for(const line of lines){

      if(line.startsWith('uuid: ')){

        //push new uuid here instead
        const uuidLine = 'uuid: ' + uuidv4();

        newLines.push(uuidLine);

      }else if(!line.startsWith('- [x] ')){

        newLines.push(line);
      }
    }

    const newBlock = newLines.join('\n');

    return newBlock;
  }

  padDigits(num) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date) {
    return (
      [
        date.getFullYear(),
        this.padDigits(date.getMonth() + 1),
        this.padDigits(date.getDate()),
      ].join('-') +
      '_' +
      [
        this.padDigits(date.getHours()),
        this.padDigits(date.getMinutes()),
        this.padDigits(date.getSeconds()),
      ].join('-')
    );
  }

  getCurrentTimeStamp(){

    return this.formatDate(new Date());
  }

  generatePraxisTemplate(){
    return 'AWAITING IMPLEMENTATION';
  }


  setPreferredAlias(markdownText, preferredAliasToSet){

    //split into lines
    const lines = markdownText.split('\n');
    let newLines = [];

    const trimmed = markdownText.trim();

    if(!trimmed.startsWith('---')){

      //there's no front matter found, so we can
      //skip checking for existing uuid also
      newLines.push('---');
      newLines.push('');

      const preferredAliasLine = 
        'preferredAlias: ' + preferredAliasToSet;
  
      newLines.push(preferredAliasLine);
      newLines.push('');
      newLines.push('---');
      newLines.push('');
      newLines = newLines.concat(lines);
    
    }else{

      //check if preferredAlias is set
      let preferredAliasIsSet = false;

      for(const line of lines){

        //parse each line to see if begins with preferredAlias: 
        if(line.startsWith('preferredAlias:')){

          preferredAliasIsSet = true;
        }
      }

      //now that we know if we have one or not
      //we can cycle through and append as appropriate

      let openFound = false;

      for(const line of lines){

        if(line.startsWith('---') && 
           !openFound){

          // console.log(line);
  
          const preferredAliasLine = 
            'preferredAlias: ' + preferredAliasToSet;
  
          openFound = true;
          newLines.push(line);
          newLines.push('');
          newLines.push(preferredAliasLine);
        
          // console.log(newLines);

        }else{

          if(line.startsWith('preferredAlias: ')){
          

            const preferredAliasLine = 
              'preferredAlias: ' + preferredAliasToSet;
            newLines.push(preferredAliasLine);

          }else{

            newLines.push(line);            

          }

        }

      }
    }

    // console.log(newLines);

    const newBlock = newLines.join('\n');

    return newBlock;
  }

  ensureUuid(markdownText){

    //split into lines
    const lines = markdownText.split('\n');
    let newLines = [];

    const trimmed = markdownText.trim();

    if(!trimmed.startsWith('---')){

      //there's no front matter found, so we can
      //skip checking for existing uuid also
      newLines.push('---');
      newLines.push('');

      const uuidLine = 'uuid: ' + uuidv4();
  
      newLines.push(uuidLine);
      newLines.push('');
      newLines.push('---');
      newLines.push('');
      newLines = newLines.concat(lines);
    
    }else{

      //check if uuid is set
      let uuidIsSet = false;

      for(const line of lines){

        //parse each line to see if begins with uuid: 
        if(line.startsWith('uuid:')){

          uuidIsSet = true;
        }
      }

      //now that we know if we have one or not
      //we can cycle through and append as appropriate

      let openFound = false;

      for(const line of lines){

        if(!uuidIsSet && 
           line.startsWith('---') && 
           !openFound){

  
          const uuidLine = 'uuid: ' + uuidv4();
  
          openFound = true;
          newLines.push(line);
          newLines.push('');
          newLines.push(uuidLine);
        
        }else{

          newLines.push(line);
        }

      }
    }

    const newBlock = newLines.join('\n');

    return newBlock
  }

  parsePreferredAlias(markdownText){
    
    //split into lines
    const lines = markdownText.split('\n');

    let preferredAlias = '';

    for(const line of lines){
      
      //parse each line to see if begins with preferredAlias: 
      if(line.startsWith('preferredAlias:')){

        preferredAlias = line.replace('preferredAlias:', '').trim();
      }
    }

    return preferredAlias;
  }

  parseUuid(markdownText){

    //split into lines
    const lines = markdownText.split('\n');

    let uuid = '';

    for(const line of lines){

      //parse each line to see if begins with uuid: 
      if(line.startsWith('uuid:')){

        uuid = line.replace('uuid:', '').trim();
      }
    }

    return uuid;
  }

  getPreferredAlias(markdownText){

    //try preferred alias
    if(this.parsePreferredAlias(markdownText)){
      return this.parsePreferredAlias(markdownText);
    }

    //try uuid
    if(this.parseUuid(markdownText)){
      return this.parseUuid(markdownText);
    }

    if(markdownText.length < 30){
      return markdownText;
    }

    return 'no uuid found';
  }

  generateName(adverbs, adjectives, nouns){

    let options = ['two', 'three'];

    this.shuffle(options);

    this.shuffle(adjectives);
    this.shuffle(nouns);

    if(options[0] === 'two'){

      return adjectives[0] + '-' + nouns[0];

    }else{

      this.shuffle(adverbs);

      return adverbs[0] + '-' + adjectives[0] + '-' + nouns[0];      
    }

  }

  shuffle(array){
    // An implementation of the Fisher-Yates (aka Knuth) Shuffle
    // from: https://stackoverflow.com/a/2450976/670768

    let currentIndex = array.length, randomIndex;

    //while there remains elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // and swap it with the current element.
      [array[currentIndex], array[randomIndex]] =
        [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

}