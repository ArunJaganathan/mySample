//directive component for login
angular.module('edu-core').directive('login', function() {

  return {

    restrict: 'E',
    templateUrl: 'client/auth/login/login.html',
    controllerAs: 'accountLogin',
    controller: function($scope, $reactive, $state) {
      $reactive(this).attach($scope);
      let self = this;

      //assign loggedin user details
      $scope.$parent.mainCtrl.isLoggedIn =  false;
      $scope.$parent.mainCtrl.currentUser = false;

      $scope.$parent.mainCtrl.pageTitle = "Login";
      self.errorMessage = "";
      self.hasError = false;

      //it happens when clicking login button, for success login it will direct
      //to dashboard
      self.loginUser = () => {

        email = self.newUser.email;
        password = self.newUser.password;
        passwordObj = Accounts._hashPassword(password);

        Meteor.call('authenticateUser', email, passwordObj, function(error, result) {

          if (error) {
            self.hasError = true;
            self.errorMessage = error.reason;
            $scope.$apply();
            return false;
          }
          //login with token
          Meteor.loginWithToken(result.token, (err) => {

            if (err) {
              self.error = err;
            } else {

              $scope.$parent.mainCtrl.isLoggedIn = Meteor.userId();
              $scope.$parent.mainCtrl.currentUser = Meteor.user();

              $state.go(result.goTo);
              $scope.$apply();
            }
          });
        });
      }
    }
  }
});
