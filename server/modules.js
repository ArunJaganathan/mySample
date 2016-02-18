// this is server file which handles methods and subscriptions
Meteor.methods({
  addModule: function(module) {
    module.status = 'draft';
    Modules.insert(module);
  },
  deleteModule: function(moduleId) {
    Modules.remove(moduleId);
  },
  updateModule: function(module, moduleId) {
    Modules.update({_id:moduleId}, {
      $set: {
        name: module.name,
        desc: module.desc,
        features: module.features,
        price: module.price
      }
    });
  },
  publishModule: function(moduleId) {
    Modules.update(moduleId, {
      $set: {
        status: 'published'
      }
    });
  },
  unpublishModule: function(moduleId){
    Modules.update(moduleId,{
      $set: {
        status: 'unpublished'
      }
    });
  }
});

Meteor.publish("modules", function () {
  return Modules.find({});
});