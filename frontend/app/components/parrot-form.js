import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  store: service('store'),

  genders: [
    {id: null, label: 'Select gender'},
    {id: 'm', label: 'Male'},
    {id: 'f', label: 'Female'}
  ],

  actions: {
    selectGender(gender) {
      this.get('parrot').set('gender', gender);
    },

    submitForm() {
      this.get('parrot').save().then((parrot) => {
        this.get('currentController').transitionToRoute('index.inner');
      });
    }
  }
});
