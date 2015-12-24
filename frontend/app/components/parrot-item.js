import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  isEditing: false,

  actions: {
    toggleEdit() {
      this.toggleProperty('isEditing');
    }
  }
});
