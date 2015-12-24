import Ember from 'ember';
import raw from 'ic-ajax';

const { service } = Ember.inject;

export default Ember.Component.extend({
  store: service('store'),

  classNames: ['form-group'],
  classNameBindings: ['parrentValid:has-success:has-error'],

  parrentValid: Ember.computed('parrot.father', 'parrot.mother', 'lookingFather', function(){
    if (this.get('lookingFather')) {
      return this.get('parrot.fatherValid');
    } else {
      return this.get('parrot.motherValid');
    }
  }),

  lookingFather: true,

  setValues() {
    const params = {
      age: 12,
      pedigree: true
    };

    if(!this.get('parrot.isNew')) {
      params['except_id'] = this.get('parrot.id');
    }

    if(this.get('lookingFather')) {
      params['gender'] = 'm';
    } else {
      params['gender'] = 'f';
    }

    this.get('store').query('parrot', params).then((parrots) => {
      this.set('values', parrots);
    });
  },

  didInsertElement() {
    this.setValues();
  },

  actions: {
    selectParent(parent) {
      if (Ember.isEmpty(parent)) {
        if(this.get('lookingFather')) {
          this.get('parrot').set('father', null);
        } else {
          this.get('parrot').set('mother', null);
        }
      } else {
        var type = null;

        if(this.get('lookingFather')) {
          type = 'father';
        } else {
          type = 'mother';
        }

        this.get('store').findRecord('parrot', parent).then((parrot) => {
          this.get('parrot').set(type, parrot);
        });
      }
    }
  }
});
