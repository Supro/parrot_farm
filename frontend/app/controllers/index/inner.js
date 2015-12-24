import Ember from 'ember';

export default Ember.Controller.extend({
  loading: false,

  canLoadMore: Ember.computed('content.[]', function(){
    return this.get('content.meta').page < this.get('content.meta').total_pages;
  })
});
