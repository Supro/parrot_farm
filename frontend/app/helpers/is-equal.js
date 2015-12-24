import Ember from 'ember';

export default Ember.Helper.helper(function(args) {
  return args[0] === args[1];
});
