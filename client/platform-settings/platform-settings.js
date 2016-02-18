angular.module('edu-core').directive('platformSettings', function() {

  return {
    restrict: 'E',
    templateUrl: 'client/platform-settings/platform-settings.html',
    controllerAs: 'settingsCtrl',
    controller: function($scope, $reactive, $stateParams, $mdDialog, $state, $mdToast, $timeout, $q, $log) {



      $reactive(this).attach($scope)
      let self = this;
      self.country = {};
      self.addCountry = () => { //Add new country to db 

        if (self.selectedItem) {
          self.country.name = self.selectedItem.display;
          self.country.code = self.selectedItem.code;
          self.selectedItem = {}

          Meteor.call("addCountry", self.country, function(error, result) {
            if (error) {
              console.log('Unable');
              $mdToast.show($mdToast.simple().textContent('Unable to add country').position('top right'));
            } 
            else
            {
              self.country = '';
              console.log('successfully');
              $mdToast.show($mdToast.simple().textContent('New country added').position('top right'));

              console.log(self.country);
              
            }
          });
        } else {
          $mdToast.show($mdToast.simple().textContent('Please enter value').position('top right'));
        }
      }



      self.grace = {};
      self.addGrace = () => {
        //Add new record to grace period


        if (self.grace.month && self.grace.year) {
          Meteor.call("addGrace", self.grace.month, self.grace.year, function(error, result) {
            if (error) {
              console.log('Unable');
              $mdToast.show($mdToast.simple().textContent('Unable to add details').position('top right'));
            } else

            {
              self.grace = {};
              console.log('successfully');
              $mdToast.show($mdToast.simple().textContent('Details added successfully').position('top right'));

              console.log(self.grace);
            }
          });
        } else {
          $mdToast.show($mdToast.simple().textContent('Please enter values').position('top right'));
        }
      }
        /*///////*/
        self.countriesSource = {};
     self.subscribe("currentSettings");
     self.subscribe("countriesSource",angular.noop,function(){
        self.countriesSource = Countries.find({}).fetch();
         self.simulateQuery = false;
      self.isDisabled = false;
      // list of `state` value/display objects
      self.states = loadAll();
      self.querySearch = querySearch;
      self.selectedItemChange = selectedItemChange;
      self.searchTextChange = searchTextChange;
      self.newState = newState;
     });
      
      self.helpers({
        countries: () => {
          let countryname = PlatformSettings.find({}).fetch()
          let gracedetails = PlatformGrace.find({}).fetch()

          self.searchText = '';
          return {
            'ctryName': countryname,
            'grace': gracedetails
          };
        }

      })
      
    

     



        /*///////*/



      function newState(state) {
        alert("Sorry! You'll need to create a Constituion for " + state + " first!");
      }
      // ******************************
      // Internal methods
      // ******************************
      /**
       * Search for states... use $timeout to simulate
       * remote dataservice call.
       */


      function querySearch(query) {
        var results = query ? self.states.filter(createFilterFor(query)) : self.states,
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

        /*///////*/


      function searchTextChange(text) {
        $log.info('Text changed to ' + text);
      }





      function selectedItemChange(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
      }



      /**
       * Build `states` list of key/value pairs
       */

      //console.log(self.countriesSource.fetch());
      function loadAll() {
        let allStates = self.countriesSource;
        return allStates.map(function(state) {
          // keys = Object.keys(state);

          return {
            value: state.name.toLowerCase(),
            display: state.name,
            code: state.code
          };
        });
      }
              /*///////*/

      /* Create filter function for a query string
       *///////////////////
      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {

          return (state.value.indexOf(lowercaseQuery) === 0);
        };


      }
        /*///////*/

    }
  }
})