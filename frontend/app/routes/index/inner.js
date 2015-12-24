import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    name: {
      refreshModel: true
    },
    slug: {
      refreshModel: true
    },
    age: {
      refreshModel: true
    },
    color: {
      refreshModel: true
    },
    pedigree: {
      refreshModel: true
    }
  },

  model(params) {
    return this.store.query('parrot', params);
  },

  setupController(controller, model){
    controller.set('model', model);
  },

  actions: {
    getMore(){
      this.get('controller').set('loading', true);

      const params = {
        age: this.get('controller.age'),
        slug: this.get('controller.slug'),
        name: this.get('controller.name'),
        color: this.get('controller.color'),
        pedigree: this.get('controller.pedigree'),
        page: this.get('controller.content.meta').page + 1
      };

      this.store.query('parrot', params).then((parrots) => {
        this.get('controller.content').set('meta', parrots.get('meta'));
        this.get('controller.content').addObjects(parrots.get('content'));
        this.get('controller').set('loading', false);
      });
    }
  }
});
