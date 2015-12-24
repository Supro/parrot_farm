import applicationSerializer from 'frontend/serializers/application';

export default applicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  atts: {
    father: { serialize: 'ids' },
    mother: { serialize: 'ids' },
  }
});
