import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api/v1',

  // allows the multiword paths in urls to be underscored
  pathForType(type) {
    let underscored = Ember.String.underscore(type);
    return Ember.String.pluralize(underscored);
  },

  // allows queries to be sent along with a findRecord
  // hopefully Ember / EmberData will soon have this built in
  urlForFindRecord(id, modelName, snapshot) {
    let url = this._super(...arguments);
    let query = Ember.get(snapshot, 'adapterOptions.query');
    if(query) {
      url += '?' + Ember.$.param(query);
    }
    return url;
  },

  shouldBackgroundReloadRecord() {
    return true;
  }
});
