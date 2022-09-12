/**
 * @file Defines a Wxrd.
 */
// const withUniversalId = require('./withUniversalId');
// const withTyping = require('./withTyping');
// const withAliasing = require('./withAliasing');
// const canLog = require('./canLog');
// const withTransport = require('./withTransport');
// const withMembers = require('./withMembers');

import { v4 as uuidv4 } from 'uuid';

const INITIAL_WXRD_UUID = '[wxrdUuid NOT SET]';

const WxrdOldFormKeepForPorting = (initializationData) => {

  const self = {
    metaData: new Map(),
  };

  const newSelf = Object.assign(
    self,
    withUniversalId(self),
    withTyping(self),
    withAliasing(self),
    withTransport(self),
    canLog(self),
    withMembers(self),
  );

  newSelf.initializeWxrdType('Wxrd');
  newSelf.initializeAliases();
  newSelf.initializeMembers();

  if (initializationData instanceof Map) {

    newSelf.metaData = Object.assign(
      initializationData,
      newSelf.metaData,
    );

  } else if (
    typeof initializationData === 'string'
    || initializationData instanceof String) {

    if (initializationData.startsWith('[[')
          && initializationData.endsWith(']]')) {

      newSelf.metaData = Object.assign(
        new Map(JSON.parse(initializationData)),
        newSelf.metaData,
      );

    } else {

      newSelf.initializeUuid();
      newSelf.initializeCreatedAt();
      newSelf.setAlias(newSelf.getUuid(), initializationData);
      newSelf.metaData.set('wxrdValue', initializationData);

    }

  } else if ("metaData" in initializationData) {

    return Object.assign(newSelf, initializationData);

  } else {

    throw new Error('unrecognized initialization data!');

  }

  return newSelf;

};

export class Wxrd {

  metaData = {
    wxrdValue: '',
    wxrdType: 'Wxrd',
    wxrdUuid: INITIAL_WXRD_UUID,
  };

  aliases = {};
  members = {};

  constructor(initializationData){

    if (typeof initializationData === 'string'
        || initializationData instanceof String) {

      // console.log('initializing...');

      this.initializeUuid();
      this.initializeCreatedAt();
      this.setAlias(this.getUuid(), initializationData);
      this.metaData.wxrdValue = initializationData;
      

    } else if ('metaData' in initializationData) {

      this.metaData = initializationData.metaData;
      this.aliases = initializationData.aliases;
      this.members = initializationData.members;

    } else {

      throw 'unrecognized initialization data!';

    }

  }

  initializeUuid() {

    if(this.metaData.wxrdUuid = INITIAL_WXRD_UUID){
      const newUuid = uuidv4();
      // console.log('initializing wxrdUuid to ' + newUuid);
      this.metaData.wxrdUuid = uuidv4();
    } else {
      const foundUuid = this.metaData.wxrdUuid;
      // console.log('wxrdUuid already exists as <' + foundUuid + '>, skipping initialization');
    }
  }

  getUuid() {

    if(!'wxrdUuid' in this.metaData){

      throw 'wxrdUuid not initialized!';
    }

    return this.metaData.wxrdUuid;
  }

  initializeCreatedAt() {

    if(!'createdAt' in this.metaData){

      const currentTime = new Date();
      this.metaData.createdAt = currentTime.toISOString();
    }
  }

  setAlias(uuidKey, aliasValue) {

    this.aliases[uuidKey] = aliasValue;
  }

  getAlias(uuidToGet) {

    if(!uuidToGet){

      // console.log('no uuid supplied, assuming alias lookup for self');
      uuidToGet = this.getUuid();
      // console.log('uuid to lookup set to <' + uuidToGet + '>');
    }

    let foundAlias = '[ALIAS NOT FOUND FOR <' + uuidToGet + '>]';

    try{

      if(this.aliases[uuidToGet]){

        foundAlias = this.aliases[uuidToGet];
      }

    }catch(err){

      foundAlias = 'Error retrieving alias: ' + err;
    }

    return foundAlias;

  }
}
