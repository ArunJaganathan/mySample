// this is view school details directive
angular.module('edu-core').directive('viewSchoolDetails', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/manage-school/view-school-details.html',
    controllerAs: 'viewSchoolDetailCtrl',
    controller: function($scope, $reactive, $state, $stateParams) {
      $reactive(this).attach($scope);
      let self = this;
      self.school = {};

      self.subscribe('viewEditSchool', () => [$stateParams.reqId], {
        onReady: function() {
          //getting school details from minimongo
          self.schools = School.find({
            "_id": $stateParams.reqId
          }).fetch();
        }
      });

      self.helpers({
        school: () => {
          return School.findOne({
            _id: $stateParams.reqId
          });
        }
      })
    }
  }
})