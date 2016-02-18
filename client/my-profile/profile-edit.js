angular.module('edu-core').directive('editProfile', function() {

  return {
    restrict: 'E',
    templateUrl: 'client/my-profile/profile-edit.html',
    controllerAs: 'profileeditCtrl',
    controller: function($scope, $reactive, $stateParams, $mdDialog, $state, $mdToast, $timeout) {
      $reactive(this).attach($scope)

      let self = this;
      Meteor.subscribe("editProfile");
      //console.log(Meteor.user())
      let userId = Meteor.userId();
      self.currentUser = Meteor.user();

      //console.log(self.currentUser);
      // self.helpers({
      //   currentUser = Meteor.user();
      // });


      self.updateProfile = () => { //update current user details
        {


          Meteor.call("updateProfile", self.currentUser, function(error, result) {
            if (error) {
              $mdToast.show($mdToast.simple().textContent('Oops unable to update').position('top right'));
              $state.go('myProfile');
            } else {
              $mdToast.show($mdToast.simple().textContent('Updated successfully').position('top right'));
              $state.go('myProfile');

            }

          })

        }

      }



    }
  }
})