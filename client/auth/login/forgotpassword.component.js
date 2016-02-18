//directive component for forgot password
angular.module('edu-core').directive('forgotPassword', function() {

  return {
    restrict: 'E',
    templateUrl: 'client/auth/login/forgotpassword.html',
    controllerAs: 'forgotPassword',
    controller: function($scope, $reactive, $state, $mdDialog, $mdMedia) {
      $reactive(this).attach($scope);
      let self = this;
      $scope.$parent.mainCtrl.pageTitle = "Forgot Password";

      self.credentials = {
        email: ''
      };

      self.hasError = false;
      self.errorMessage = "";

      //calling below function when clicking the button
      self.getPassword = (ev) => {

        let email = self.credentials.email;
        //calling method to send reset link
        Meteor.call('sendPasswordResetLink', email, function(error, result) {

          if (error) {
            console.log(error)
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
            .textContent('We have emailed you the instructions to reset the password')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
          );

        });
      }
    }
  }
});
