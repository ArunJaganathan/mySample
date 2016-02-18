//controller for main layout page - index.html
angular.module('edu-core').controller('MainCtrl', function ($scope, $reactive, $state) { 
      $reactive(this).attach($scope);
 
      let self = this;

      //assigning loggedin user details
      self.isLoggedIn =  Meteor.userId();
      self.currentUser=  Meteor.user();

});