PlatformSettings = new Mongo.Collection('platform_settings')//adding countries to platform admin's settings page.
PlatformGrace = new Mongo.Collection('platform_grace')// adding grace period inside platfom admin page settings
Countries = new Mongo.Collection('country')

PlatformSettings.allow({
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


PlatformGrace.allow({
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