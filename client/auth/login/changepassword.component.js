//directive component for change password
angular.module('edu-core').directive('changePassword', function() {

  return {
    restrict: 'E',
    templateUrl: 'client/auth/login/change-password.html',
    controllerAs: 'changePasswordCntl',
    controller: function($scope, $stateParams, $reactive, $state, $mdDialog, $mdMedia) {
      $reactive(this).attach($scope);

      let self = this;
      $scope.$parent.mainCtrl.pageTitle = "Choose Your Password";
      self.hasError = false;
      self.errorMessage = "";

      //calling below function when clicking the button
      self.changeLoginPassword = (ev) => {

        currentPassword = "";
        newPassword = "";
        confirmPassword = "";
        passwordObj = {};

        if (self.current_password) {
          currentPassword = self.current_password;
          passwordObj = Accounts._hashPassword(currentPassword);
        }
        if (self.new_password)
          newPassword = self.new_password;
        if (self.confirm_password)
          confirmPassword = self.confirm_password;

        //calling method to change password
        Meteor.call('changePasswordByUserId', currentPassword, newPassword, confirmPassword, passwordObj, function(error, result) {

          if (error) {
            // show a error message
            self.hasError = true;
            self.errorMessage = error.reason;
            $scope.$apply();
            return false;
          }

          $scope.status = '  ';
          $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

          self.hasError = false;
          self.errorMessage = "";
          // Appending dialog to document.body to cover sidenav in docs app
          // Modal dialogs should fully cover application
          // to prevent interaction outside of dialog
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Success')
            .textContent('Success...You changed the password successfully')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
          );
        });

      }

    }
  }
});
