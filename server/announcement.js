Meteor.publish("announcementList", function() {
  return Announcement.find({})
});


Meteor.methods({
  announceSend: function(dataArry, action) {
    console.log(dataArry)
    if (action == 'save') {
      Announcement.insert(dataArry);
    }
    if (action == 'resend') {
      Announcement.insert(dataArry);
    }

  },


});