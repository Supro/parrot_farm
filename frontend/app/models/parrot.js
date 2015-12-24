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

  father: belongsTo('parrot', { async: false, inverse: null }),
  mother: belongsTo('parrot', { async: false, inverse: null }),

  isMale: Ember.computed.equal('gender', 'm'),

  isFemale: Ember.computed.equal('gender', 'f'),

  genderValid: Ember.computed('gender', function(){
    return ['f', 'm'].contains(this.get('gender'));
  }),

  ageMin: 1,
  ageMax: 1200,
  ageValid: Ember.computed('age', function(){
    return this.get('age') > this.get('ageMin') &&
           this.get('age') < this.get('ageMax');
  }),

  colorValid: Ember.computed.notEmpty('color'),

  formValid: Ember.computed('color', 'gender', 'age', function(){
    return this.get('colorValid') && this.get('ageValid') && this.get('genderValid');
  }),

  formInvalid: Ember.computed.equal('formValid', false)
});
