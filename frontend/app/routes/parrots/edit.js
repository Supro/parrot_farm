import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('parrot', params.id);
  },

  setupController(controller, model) {
    controller.set('model', model);
  }
})
