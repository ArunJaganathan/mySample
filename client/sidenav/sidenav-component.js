angular.module('edu-core').directive('sideNav', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/sidenav/sidenav.html',
    controllerAs: 'sidenavCtrl',
    controller: function($scope, $mdDialog, $log, $rootScope, $reactive) {
      $reactive(this).attach($scope);
      let self = this;
      self.settings = [{
        name: 'Dashboard',
        icon: 'home',
        url: 'platformAdmin',
        enabled: true
      }, {
        name: 'Manage Schools',
        icon: 'accessibility',
        url: 'manage-school',
        enabled: false
      }, {
        name: 'Manage Users',
        icon: 'work',
        url: 'users',
        enabled: false
      }, {
        name: 'Manage Announcements',
        icon: 'pets',
        url: 'announcement',
        enabled: false
      }, {
        name: 'Manage Subscriptions',
        icon: 'favorite_border',
        url: 'subscriptionpackage',
        enabled: false
      }, {
        name: 'Manage Modules',
        icon: 'work',
        url: 'manage-module',
        enabled: false
      }];
      self.changeTheme = (themeName) => {
        console.log($rootScope);
        $scope.dynamicTheme = themeName;
        $rootScope.dynamicTheme = themeName;
      }

      self.navigateTo = (event) => {
        $log.debug(this.$$childTail);
      };
    }
  }
});
