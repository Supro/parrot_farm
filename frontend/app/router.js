import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '/' }, function(){
    this.route('inner', { path: '/' });
  });

  this.route('parrots', { path: '/parrots' }, function(){
    this.route('edit', { path: '/:id/edit' });
  });
});

export default Router;
