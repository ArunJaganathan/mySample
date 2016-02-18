// this is manage school directive
angular.module('edu-core').directive('manageSchool', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/manage-school/manage-schools.html',
    controllerAs: 'manageSchoolCtrl',
    controller: function($scope, $reactive) {
      $reactive(this).attach($scope);
      let self = this;
      self.schoolName = null;
      self.country = null;
      self.listTitle = 'Recently Added Schools';
      self.subscribe('schools');
      self.helpers({
          schools: () => {
            return School.find({}, {
              limit: 5,
              sort: {
                received_dt: -1
              }
            });
          }
        })
      // Searching schools
      self.search = () => {
        Meteor.call('schoolSearchResult', self.schoolName, function(error, result) {
          if (error) {
            console.log('unable to load search result');
            return;
          } else {
            console.log('successfully loaded' + result);
            self.schools = result;
          }
        });
        self.listTitle = 'Search Result';
      }
    }
  }
})