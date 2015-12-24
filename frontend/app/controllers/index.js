import Ember from 'ember';

const { controller } = Ember.inject;

export default Ember.Controller.extend({
  indexInnerController: controller('index.inner'),

  addingParrot: false,

  actions: {
    toggleParrotForm() {
      this.toggleProperty('addingParrot');
    }
  }
});
