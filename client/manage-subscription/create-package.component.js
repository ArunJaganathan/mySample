angular.module('edu-core').directive('subscriptionPackage', function() {
  return {
    restrict: 'AE',
    templateUrl: 'client/manage-subscription/create-package.html',
    controllerAs: 'subscriptionPackageCtrl',
    controller: function($scope, $reactive, $mdDialog, $mdToast, $state, $stateParams) {
      $reactive(this).attach($scope)
      let self = this;
      self.monthlyPrice = 0;
      self.yearlyPrice = 0;
      $scope.errors = {};
      //self.subPackages={};
      self.subscribe('modules', angular.noop, function() {
        if ($stateParams.packId) {
          self.subscribe("packageList", angular.noop, function() {
            var modes = SubscriptionPackage.findOne({
              _id: $stateParams.packId
            }, {
              sort: {
                _id: -1
              }
            });

            for (i = 0; i < modes.modules.length; i++) {
              if (self.modules[modes.modules[i]] === undefined) {
                self.modules[modes.modules[i]] = {};
              }

              self.modules[modes.modules[i]].isChecked = true;

            }
            self.monthlyPrice = modes.price.monthly;
            self.yearlyPrice = modes.price.yearly;
          });
        }
      });

      if ($stateParams.packId) {
        self.helpers({
          subPackages: () => { //Listing one selected users details

            return SubscriptionPackage.findOne({
              _id: $stateParams.packId
            });
          },
          modules: () => { //Listing published modules in desc order
            return Modules.find({
              status: "published"
            }, {
              sort: {
                _id: -1
              }
            });
          }
        });
      } else {
        self.helpers({ //Listing published modules in desc order
          modules: () => {
            return Modules.find({
              status: "published"
            }, {
              sort: {
                _id: -1
              }
            });
          }
        });
      }
      let monthly = null;
      let yearly = null;
      self.savePackage = (pubAction) => { //for adding new package based on action
        let packageArray = [];
        if(!self.subPackages){
        self.subPackages = {};
        self.subPackages.price = {};
      }
        for (let key in self.modules) {
          if (self.modules[key]) {
            if (self.modules[key].isChecked) {
              packageArray.push(key);
            }
          }
        }
        //console.log(packageArray);
        self.subPackages.modules = packageArray;
        self.subPackages.status = 'save'; //activated
        self.subPackages.created_dt = new Date();
        self.subPackages.price.monthly = self.monthlyPrice;
        self.subPackages.price.yearly = self.yearlyPrice;
        console.log(self.subPackages)

        let packId = $stateParams.packId || null;
        /**
                below is the way to attach the scheme
                **/
        // SubscriptionPackage.attachSchema(PackageSchema, {
        //   replace: true
        // });

        /**
        below is the way to validate.we are passing the data as chumma_data against the schema
        **/
        //console.log('<<==>>')
        // console.log(self.dataArry);
        // SubscriptionPackage.simpleSchema().namedContext("PackageSchema").validate(self.subPackages, {
        //   modifier: false
        // });


        /**
        below is the way to get the keys which has broken its corresponding rules
        **/
        // let context = SubscriptionPackage.simpleSchema().namedContext("PackageSchema");
        // let errorsList = context.invalidKeys();




        /********************************/


        // console.log(self.subPackages);


        /*//***************************/
        Meteor.call("savePack", pubAction, packId, self.subPackages, function(error, result) {
          if (error) {
            console.log(error);
            for (let i = 0; i < error.length; i++) {
              console.log(errorsList[i])
              if (error[i]['name'] == "description") {
                $scope.errors['description'] = "Please enter description";
              }
              if (error[i]['type'] == "minString") {
                $scope.errors['description'] = "Description too short";
                getToastbox($mdToast, 'Description too short !');
              }
              if (error[i]['name'] == "send_to") {
                $scope.errors['send_to'] = 'Please select any users';
              }

            }
            // $scope.errors['package_name'] = 'Package name ' + self.subPackages.name + ' exists !';
            // getToastbox($mdToast, 'Package name ' + self.subPackages.name + ' exists !');
            // self.subPackages.name = '';

          } else {
            if ($stateParams.packId) {
              getToastbox($mdToast, 'Package updated successfully !');
            } else {
              getToastbox($mdToast, 'Package saved successfully !');
            }
            self.sub = null;
            $state.go('subscriptionpackage');
          }
        });





      };



      self.getPublished = (pubAction) => {
        //for publishing based on action
        let packageArray = [];
        for (let key in self.modules) {
          if (self.modules[key]) {
            if (self.modules[key].isChecked) {
              packageArray.push(key);
            }
          }
        }

        self.subPackages.modules = packageArray;
        self.subPackages.status = 'unpublish';
        self.subPackages.created_dt = new Date();
        self.subPackages.price.monthly = self.monthlyPrice;
        self.subPackages.price.yearly = self.yearlyPrice;
        let packId = $stateParams.packId || null;
        //console.log(self.subPackages)
        Meteor.call("createAndPublish", pubAction, packId, self.subPackages, function(error, result) {
          if (error) {
            getAlertbox($mdDialog, 'Unable to save package !');
          } else {
            getToastbox($mdToast, 'Package published successfully !');
            self.sub = null;
            $state.go('subscriptionpackage');
          }
        });
      };

      let modules = null;
      self.allItemsSelected = false;
      let monthlyPrice = null;
      let yearlyPrice = null;
      let moduleArray = [];
      self.selectAll = (selected) => { // To select all checkboxes
        let monthlyPrice = null;
        let yearlyPrice = null;
        for (var i = 0; i < self.modules.length; i++) {
          self.modules[i].isChecked = selected;
        }
        if (selected === true) {
          for (var i = 0, len = self.modules.length; i < len; i++) {
            monthlyPrice += Number(self.modules[i].price.monthly);
            yearlyPrice += Number(self.modules[i].price.yearly);
          }
        }
        self.monthlyPrice = monthlyPrice;
        self.yearlyPrice = yearlyPrice;
        self.deselectAll = false;
      };

      self.deselectedAll = () => { // To unchecks all checkboxes
        for (var i = 0; i < self.modules.length; i++) {
          self.modules[i].isChecked = false;
        }
        self.allItemsSelected = false;
        self.monthlyPrice = 0;
        self.yearlyPrice = 0;
      };

      self.getClicked = (module) => { //On single checkbox clicks
        if (module.isChecked) {
          self.deselectAll = false;
          self.monthlyPrice += parseFloat(module.price.monthly);
          self.yearlyPrice += parseFloat(module.price.yearly);
        } else if (!module.isChecked) {
          self.allItemsSelected = false;
          self.monthlyPrice -= parseFloat(module.price.monthly);
          self.yearlyPrice -= parseFloat(module.price.yearly);
        }
      }
    }
  }
  /**********************Function call**************************************/

  function getAlertbox($mdDialog, txt) {
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title(txt)
      .textContent('')
      .ariaLabel('Alert Dialog Demo')
      .ok('OK !')
      .targetEvent()
    );
  }

  function getToastbox($mdToast, txt) {
    $mdToast.show($mdToast.simple().textContent(txt).position('top right'));
  }

})