Meteor.publish("packageList", function() {
  return SubscriptionPackage.find({})
});

Meteor.methods({
  // addModulePack: function(module) {
  //   module.status = 'save_only';
  //   SubscriptionPackage.insert(module);
  // },
  deletePackage: function(packId) {
    SubscriptionPackage.remove(packId);
  },
  deActivate: function(packId) {
    SubscriptionPackage.update(packId, {
      $set: {
        status: 'inactive'
      }
    });
  },
  publishPackage: function(packId) {
    SubscriptionPackage.update(packId, {
      $set: {
        status: 'unpublish'
      }
    });
  }
});