// this is server file which handles methods and subscriptions
Meteor.methods({
  listSchools: function() {
    return School.find({}, {
      limit: 5,
      sort: {
        received_dt: -1
      }
    });
  },
  // school search based on name pattern
  schoolSearchResult: function(schoolName) {
    let re = new RegExp(schoolName, 'i');
    let res = School.find({
      name: re
    }).fetch();
    return res;
  }
});

Meteor.publish("schools", function() {
  return School.find({}, {
    limit: 5,
    sort: {
      received_dt: -1
    }
  });
});
// publisg for view and edit school
Meteor.publish('viewEditSchool', function(reqId) {
  res = School.find({
    _id: reqId
  });
  return res;
});