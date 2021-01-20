'use strict';

class Apple {
  constructor ({ model }) {
    this.className = 'Apple';
    this.model = model;
  }
  getModel () {
    return this.model
  }
}

const appleModel = new Apple({
  model: 'IphoneX'
}).getModel();

console.log(appleModel);
