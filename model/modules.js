// model for modules
Modules = new Mongo.Collection("modules");

Modules.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fields, modifier) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});