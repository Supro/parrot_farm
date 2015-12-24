import Ember from 'ember';
import raw from 'ic-ajax';

export default Ember.Service.extend({
  colors: Ember.computed('colors', function(){
    raw({
      url: '/api/v1/settings',
      type: 'GET'
    }).then((response) => {
      const colors = []

      colors.push({id: "", label: 'Select color'});

      response.colors.forEach((color) => {
        colors.push({id: color, label: color})
      });

      this.set('colors', colors);
    });
  }),

  genders: [
    {id: "", label: 'Select gender'},
    {id: 'm', label: 'Male'},
    {id: 'f', label: 'Female'}
  ],
});
