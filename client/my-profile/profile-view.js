angular.module('edu-core').directive('myProfile', function() {

  return {
    restrict: 'E',
    templateUrl: 'client/my-profile/profile-view.html',
    controllerAs: 'profileCtrl',
    controller: function($scope, $reactive, $stateParams, $mdDialog, $state) {
      $reactive(this).attach($scope)

      let self = this;
      self.subscribe("myProfile");
      //console.log(Meteor.user())

      self.currentUser = Meteor.user();
    }
  }
})