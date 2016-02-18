angular.module('edu-core').directive('headerComponent', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/header/header.html',
    controllerAs: 'headerCtrl',
    controller: function($scope, $mdDialog, $log, $rootScope, $reactive, $state) {
      $reactive(this).attach($scope);
      let self = this;

      self.toggleSidenav = function(menuId) {

        $mdSidenav(menuId).toggle();
      };

      //logout event
      self.logout = () => {
        Accounts.logout(function(err) {
          if (!err) { //go to login page
            $state.go('login');
          }
        });
      }

      self.simulateQuery = false;
      self.isDisabled = false;
      // list of `state` value/display objects
      self.states = loadAll;
      self.querySearch = querySearch;
      self.selectedItemChange = self.selectedItemChange;
      self.searchTextChange = self.searchTextChange;
      self.newState = self.newState;

      self.newState = (state) => {
          alert("Sorry! You'll need to create a Constituion for " + state + " first!");
        }
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
      let querySearch = (query) => {
        let results = query ? self.states.filter(createFilterFor(query)) : self.states,
          deferred;
        if (self.simulateQuery) {
          deferred = $q.defer();
          $timeout(function() {
            deferred.resolve(results);
          }, Math.random() * 1000, false);
          return deferred.promise;
        } else {
          return results;
        }
      }

      self.searchTextChange = (text) => {
        $log.info('Text changed to ' + text);
      }

      function selectedItemChange(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
      }
      /**
       * Build `states` list of key/value pairs
       */
      let loadAll = function() {
          let allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
          return allStates.split(/, +/g).map(function(state) {
            return {
              value: state.toLowerCase(),
              display: state
            };
          });
        }
        /**
         * Create filter function for a query string
         */
      self.createFilterFor = (query) => {
        let lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
          return (state.value.indexOf(lowercaseQuery) === 0);
        };
      }
      var originatorEv;

      //For the logout menu  
      this.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
      };
      this.notificationsEnabled = true;
      this.toggleNotifications = function() {
        this.notificationsEnabled = !this.notificationsEnabled;
      };
      this.redial = function() {
        $mdDialog.show(
          $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
        );
        originatorEv = null;
      };
      this.checkVoicemail = function() {
        // This never happens.
      };
    }
  }
});
