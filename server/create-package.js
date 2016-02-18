Meteor.methods({
  savePack: function(action, packId, dataArry) {
    if (action == 'add') {
      console.log(dataArry)
      // let packageName = dataArry.name;
      // //console.log('===>> ' + packageName)
      // packName = SubscriptionPackage.findOne({
      //   "name": packageName
      // })
      // console.log(packName.name)
      // if (packName.name === packageName) { //verify Duplicate name 
      //   throw new Meteor.Error(403, "Exists");
      // } else {
      //   SubscriptionPackage.insert(dataArry);
      // }


      
 SubscriptionPackage.insert(dataArry,function(error, result) {
      if(error){
        console.log("server error")
        var invalidKeys = books.simpleSchema().namedContext().invalidKeys();
        console.log(invalidKeys)
        throw new Meteor.Error(SubscriptionPackage.simpleSchema().namedContext().invalidKeys());
      }else{
        console.log("server success")
        console.log(result)
      }
    });



    }
    if (action == 'edit') {
      SubscriptionPackage.update(packId, {
        $set: {
          name: dataArry.name,
          price: dataArry.price,
          status: dataArry.status,
          modules: dataArry.modules
        }
      });
    }
  },
  createAndPublish: function(action, packId, dataArry) {
    if (action == 'add') {
      SubscriptionPackage.insert(dataArry);
    }
    if (action == 'edit') {
      SubscriptionPackage.update(packId, {
        $set: {

          name: dataArry.name,
          price: dataArry.price,
          status: dataArry.status
        }
      });
    }
  },

});