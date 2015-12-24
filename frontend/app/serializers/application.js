import Ember from 'ember';
import DS from 'ember-data';

const {
  get,
  isNone,
  merge
} = Ember

const {
  singularize,
  classify,
  decamelize,
  camelize,
  underscore
} = Ember.String;

export default DS.JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return underscore(attr);
  },

  keyForRelationship: function(rawKey) {
    return underscore(rawKey);
  },

  keyForRelationshipAm: function(relationshipModelName, kind) {
    var key = decamelize(relationshipModelName);

    if (kind === "belongsTo") {
      return key + "_id";
    } else if (kind === "hasMany") {
      return singularize(key) + "_ids";
    } else {
      return key;
    }
  },

  serializeIntoHash(hash, typeClass, snapshot, options) {
    var normalizedRootKey = this.payloadKeyFromModelName(typeClass.modelName);
    hash[normalizedRootKey] = this.serialize(snapshot, options);
  },

  payloadKeyFromModelName: function(modelName) {
    return underscore(decamelize(modelName));
  },

  serialize(snapshot, options) {
    var json = {};

    if (options && options.includeId) {
      var id = snapshot.id;

      if (id) {
        json[get(this, 'primaryKey')] = id;
      }
    }

    snapshot.eachAttribute((key, attribute) => {
      this.serializeAttribute(snapshot, json, key, attribute);
    });

    snapshot.eachRelationship((key, relationship) => {
      if (relationship.kind === 'belongsTo') {
        this.serializeBelongsTo(snapshot, json, relationship);
      } else if (relationship.kind === 'hasMany') {
        this.serializeHasManyNew(snapshot, json, relationship);
      }
    });

    return json;
  },

  serializeAttribute(snapshot, json, key, attribute) {
    var type = attribute.type;

    if (this._canSerialize(key)) {
      var value = snapshot.attr(key);
      if (type) {
        var transform = this.transformFor(type);
        value = transform.serialize(value);
      }

      // if provided, use the mapping provided by `attrs` in
      // the serializer
      var payloadKey =  this._getMappedKey(key, snapshot.type);

      if (payloadKey === key && this.keyForAttribute) {
        payloadKey = this.keyForAttribute(key, 'serialize');
      }

      json[payloadKey] = value;
    }
  },

  serializeBelongsTo(snapshot, json, relationship) {
    var key = relationship.key;

    if (this._canSerialize(key)) {
      var belongsToId = snapshot.belongsTo(key, { id: true });

      // if provided, use the mapping provided by `attrs` in
      // the serializer
      var payloadKey = this._getMappedKey(key, snapshot.type);
      if (payloadKey === key && this.keyForRelationship) {
        payloadKey = this.keyForRelationshipAm(key, "belongsTo");
      }

      //Need to check whether the id is there for new&async records
      if (isNone(belongsToId)) {
        json[payloadKey] = null;
      } else {
        json[payloadKey] = belongsToId;
      }

      if (relationship.options.polymorphic) {
        this.serializePolymorphicType(snapshot, json, relationship);
      }
    }
  },

  serializeHasManyNew(snapshot, json, relationship) {
    var attr = relationship.key;
    if (this.noSerializeOptionSpecified(attr)) {
      this._super(snapshot, json, relationship);
      return;
    }
    var includeIds = this.hasSerializeIdsOption(attr);
    var includeRecords = this.hasSerializeRecordsOption(attr);
    if (includeIds) {
      let serializedKey = this.keyForRelationshipAm(attr, relationship.kind);
      json[serializedKey] = snapshot.hasMany(attr, { ids: true });
    } else if (includeRecords) {
      this._serializeEmbeddedHasMany(snapshot, json, relationship);
    }
  }
});
