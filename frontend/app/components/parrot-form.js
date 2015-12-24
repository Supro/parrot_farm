import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  store: service('store'),
  baseData: service('base-data'),

  newParrot() {
    return this.get('store').createRecord('parrot');
  },

  parrot: Ember.computed(function(){
    return this.newParrot();
  }),

  actions: {
    selectGender(gender) {
      this.get('parrot').set('gender', gender);
    },

    submitForm() {
      const isNew = this.get('parrot.isNew');

      this.get('parrot').save().then((parrot) => {
        if (isNew) {
          this.get('currentController').set('addingParrot', false);
          this.get('indexInnerController').get('model').pushObject(parrot._internalModel);
        } else {
          this.get('currentController').transitionToRoute('index.inner');
        }
      });
    }
  }
});
