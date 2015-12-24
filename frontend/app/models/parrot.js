import DS from 'ember-data';

const {
  attr,
  belongsTo,
  hasMany
} = DS;

export default DS.Model.extend({
  name: attr('string'),
  slug: attr('string'),
  color: attr('string'),
  gender: attr('string'),
  age: attr('number'),
  pedigree: attr('boolean'),

  father: belongsTo('parrot', { async: false }),
  mother: belongsTo('parrot', { async: false }),

  isMale: Ember.computed.equal('gender', 'm'),

  isFemale: Ember.computed.equal('gender', 'f')
});
