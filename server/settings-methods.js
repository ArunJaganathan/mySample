Meteor.methods({
  addCountry: function(country) {
   PlatformSettings.insert(country)
  // Countries.
  }

 
});


Meteor.methods({
  addGrace: function(grace){
   PlatformGrace.insert(grace)
  }

 
});