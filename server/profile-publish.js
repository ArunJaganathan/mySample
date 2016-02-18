Meteor.publish("myProfile", function() {
 
    return Meteor.users.find({})
    });


Meteor.publish("editProfile", function() {
 
    return Meteor.users.find({})
    });