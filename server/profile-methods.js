Meteor.methods({
  updateProfile: function(profileValue) {
    console.log(profileValue);
    // 
let userId = Meteor.userId();console.log(userId)
    Meteor.users.update({
      _id: userId
    }, {
      $set: {
        profile: {

          name: profileValue.profile.name,
          phone: profileValue.profile.phone,
          address:{
            line1: profileValue.profile.address.line1,
            line2: profileValue.profile.address.line2,
            city: profileValue.profile.address.city,
            state: profileValue.profile.address.state,
            country: profileValue.profile.address.country,
            pincode: profileValue.profile.address.pincode
          }
        }
      }
    });
  }
});