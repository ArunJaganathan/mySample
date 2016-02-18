//directive component for verifying user
angular.module('edu-core').directive('verifyUser', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/auth/register/verify-user.html',
    controllerAs: 'verifyUserCtrl',
    controller: function($scope, $stateParams, $reactive, $state, $mdDialog, $mdMedia) {
      $reactive(this).attach($scope);
      let self = this;
      tokenId = $stateParams.token;

      $scope.$parent.mainCtrl.pageTitle = "Choose Your Password";
      
      //calling below function when clicking the button
      this.verifyUserByToken = (ev) => {

        self.hasError = false;
        self.errorMessage = "";

        new_password = self.new_password;
        confirm_password = self.confirm_password;

        Meteor.call('verifyUserByTokenId', tokenId, new_password, confirm_password, function(error, result) {

          if (error) {
            // show a error message
            self.hasError = true;
            self.errorMessage = error.reason;
            return false;
          }

          $scope.status = '  ';
          $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

          // Appending dialog to document.body to cover sidenav in docs app
          // Modal dialogs should fully cover application
          // to prevent interaction outside of dialog
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Success')
            .textContent('Success...You can login with newly created password')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
          );

        });

      }

    }
  }
});
