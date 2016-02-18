//directive component for register
angular.module('edu-core').directive('register', function() {

  return {
    restrict: 'E',
    templateUrl: 'client/auth/register/register.html',
    controllerAs: 'accountRegister',
    controller: function($scope, $reactive, $mdDialog, $mdMedia) {
      $reactive(this).attach($scope);
      self = this;
      $scope.$parent.mainCtrl.pageTitle = "Register";
      self.errorMessage = "";
      self.hasError = false;

      //calling below function when clicking the register button
      self.addUser = (ev) => {

        var email = self.email;

        if (email == null) {

          self.hasError = true;
          self.errorMessage = 'Please enter a valid email address';
          return;
        }

        Meteor.call('createUserWithoutPassword', email, function(error, result) {
          self.hasError = true;
          self.errorMessage = error.reason;
          if (error) return;

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
            .textContent(result)
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
          );

        });

      }
    }
  }

});