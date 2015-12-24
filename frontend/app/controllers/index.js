import Ember from 'ember';

const {
  service,
  controller
} = Ember.inject;

export default Ember.Controller.extend({
  indexInnerController: controller('index.inner'),
  baseData: service('base-data'),

  addingParrot: false,

  name: Ember.computed(function(){
    return this.get('indexInnerController.name');
  }),

  nameObserver: Ember.observer('name', function(){
    clearTimeout(this.get('nameTimeout'));

    this.set('nameTimeout', setTimeout(() => {
      this.get('indexInnerController').set('name', this.get('name'));
    }, 500));
  }),

  slug: Ember.computed(function(){
    return this.get('indexInnerController.slug');
  }),

  slugObserver: Ember.observer('slug', function(){
    clearTimeout(this.get('slugTimeout'));

    this.set('slugTimeout', setTimeout(() => {
      this.get('indexInnerController').set('slug', this.get('slug'));
    }, 500));
  }),

  actions: {
    toggleParrotForm() {
      this.toggleProperty('addingParrot');
    },

    selectColor(color) {
      this.get('indexInnerController').set('color', color);
    },

    selectGender(gender) {
      this.get('indexInnerController').set('gender', gender);
    },
  }
});
