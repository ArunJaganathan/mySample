Meteor.publish("currentSettings", function() {
 
    return PlatformSettings.find({})
    });
Meteor.publish("countriesSource", function() {
 
    return Countries.find({})
    });