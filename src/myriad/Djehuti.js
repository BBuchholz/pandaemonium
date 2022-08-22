export class Djehuti {

  constructor(){

  }

  parsePreferredAlias(markdownText){
    //TODO: implement with unit tests
    return '';
  }

  parseUuid(markdownText){
    //TODO: implement with unit tests
    return '';
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