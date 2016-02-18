// model for package
SubscriptionPackage = new Mongo.Collection('package');

// SubscriptionPackage.allow({
//   insert: function(userId, doc) {
//     return true;
//   },
//   update: function(userId, doc, fields, modifier) {
//     return true;
//   },
//   remove: function(userId, doc) {
//     return true;
//   }
// });


let Schemas = {};
Schemas.PackageSchema = new SimpleSchema({
  name: {
    type: String,
    label: "name",
    min: 5
  },
  stud_sprt: {
    type: String,
    label: "Select user"
  }

});


SubscriptionPackage.attachSchema(Schemas.PackageSchema);