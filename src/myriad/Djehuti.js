import { Wxrd } from './Wxrd';
import { MDWxrd } from './MDWxrd';

import { v4 as uuidv4 } from 'uuid';

export class Djehuti {

  constructor(){

  }

  createWxrd(multiLineInput) {
 
    return new Wxrd(multiLineInput);
  }

  createMDWxrd(multiLineInput) {
 
    let newWxrd = new MDWxrd(multiLineInput);

    this.parseMD(newWxrd);

    // console.log(newWxrd);

    return newWxrd;
  }

  startsWithADivider(multiLineInput) {

    let found = false;

    if(multiLineInput.trim().startsWith('---')){
      
      found = true;
    }

    return found;
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

  parseMD(wxrd) {

    if(this.startsWithADivider(wxrd.markDown)){

      // console.log('found opening divider');

      // set to false here, will flip to true on first
      // line in for loop below, then back to false
      // when it finds the next divider
      let inFrontMattter = false;
      let frontMatterClosed = false;
      // let outOfFrontMatter = true; 
      let dividerCount = 0;

      const lines = this.splitToLines(wxrd.markDown);

      // console.log('lines found: ' + lines.length);

      let parsedContent = '';
      let lineCount = 0;
      let frontMatterLines = [];

      for (const line of lines){

        lineCount++;
        // console.log('begin processing line ' + lineCount);

        if(this.startsWithADivider(line)){

          // console.log('closing divider found');

          // we found a divider, toggle status
          // which was initialized to false above
          // if its the first we'll become true
          // if its the second it'll become false
          inFrontMattter = !inFrontMattter;
          dividerCount++;

          // if(dividerCount < 2){
          //  outOfFrontMatter = false;
          // }
        }

        // console.log("inFrontMattter: " + inFrontMattter);
        // console.log("dividerCount: " + dividerCount);

        if(inFrontMattter && dividerCount < 2){

          // ignore divider lines and empty lines

          frontMatterLines.push(line);
          // console.log('frontMatterLines: ' + frontMatterLines);

          // console.log('front matter line prior to trim: ' + line);

          // const trimmedLine = line.replace(/-/g, '').trim();

          const trimmedLine = line;

          if(trimmedLine){

            // console.log('processing line: ' + trimmedLine);

            const metaKey = trimmedLine.slice(0, trimmedLine.indexOf(':')).trim();
            const metaValue = trimmedLine.slice(trimmedLine.indexOf(':') + 1).trim();

            if(!metaValue.startsWith('-')){

            wxrd.metaData[metaKey] = metaValue; 
            }

          } else {

            // console.log('ignoring empty line');
          }

        } else if (dividerCount == 2 && 
               !frontMatterClosed) {

          // add the closing divider to front matter
          frontMatterLines.push(line);
          frontMatterClosed = true;

        } else {

          // console.log(wxrd);

          // console.log("line of content: " + line);
          // console.log(dividerCount);

          if(!this.startsWithADivider(line) ||
            dividerCount > 2){

            parsedContent += line;  
          }
        
        }


        // console.log('end processing line ' + lineCount);

      }

      // console.log('finished front matter lines: ' + frontMatterLines);

      wxrd.content = parsedContent;
      wxrd.frontMatter = frontMatterLines.join('\n');

      // console.log(wxrd);
    }
  }

  splitToLines(multiLineInput) {

    return multiLineInput.split('\n');
  }


  // TODO: Mimic createWxrd to implement createMarkDown

  importWxrdFromJson(jsonString) {

    if(!this.hasJsonStructure(jsonString)){

      throw "can't import json from non-json string";
    }

    const parsed = JSON.parse(jsonString);

    return new Wxrd(parsed);
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




  importMDWxrdFromJson(jsonString) {

    if(!this.hasJsonStructure(jsonString)){

      throw "can't import json from non-json string";
    }

    const parsed = JSON.parse(jsonString);

    return new MDWxrd(parsed);
  }

  hasJsonStructure(str) {
  
    // adapted from: https://stackoverflow.com/a/52799327/670768
    if (typeof str !== 'string') {
      return false;
    }

      try {
      
          const result = JSON.parse(str);
          const type = Object.prototype.toString.call(result);
          return type === '[object Object]' 
              || type === '[object Array]';
      
      } catch (err) {
      
          return false;
      }
  }
}