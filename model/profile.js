PlatformProfile = new Mongo.Collection('platform_profile')//adding my profile to platform admin's settings page.
PlatformProfile.allow({
	insert: function(userId, doc) {	
		return true;
	},
  update: function (userId, doc, fields, modifier) {
    return true;
  },	
  remove: function(userId, doc) {	
		return true;
	}
});

