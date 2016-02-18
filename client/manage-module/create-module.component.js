angular.module('edu-core').directive('createModule', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/manage-module/create-module.html',
    controllerAs: 'createModuleCtrl',
    controller: function($scope, $reactive, $state, $stateParams, $mdToast, $mdDialog) {
      $reactive(this).attach($scope);
      let self = this;
      self.module = {};
      self.module.price = {};
      self.editIndex = null;
      self.btnValue = 'ADD';
      self.pageTitle = 'Create New Module';
      self.module.features = [];
      self.subscribe('modules');
      if ($stateParams.moduleId) {
        self.helpers({
          module: () => {
            return Modules.findOne({
              _id: $stateParams.moduleId
            });
          }
        })
        self.pageTitle = 'Update Module';
      }
      // Insert a module into the collection
      self.addModule = () => {
          let tempFeatures = [];
          angular.copy(self.module.features, tempFeatures);
          self.module.features = [];
          angular.forEach(tempFeatures, function(feature, index) {
            self.module.features.push({
              name: feature.name
            });
          });
          Meteor.call("addModule", self.module, function(error, result) {
            if (error) {
              // error toast with reason
            } else {
              $mdToast.show($mdToast.simple().textContent(self.module.name + ' Module newly added!').position('top right'));
              self.module = {};
              self.module.price = {};
              $state.go('manage-module');
            }
          });
        }
        //update current module
      self.updateModule = () => {
        let tempFeatures = [];
        angular.copy(self.module.features, tempFeatures);
        self.module.features = [];
        angular.forEach(tempFeatures, function(feature, index) {
          self.module.features.push({
            name: feature.name
          });
        });
        if (self.module.status === 'unpublished') {
          $mdToast.show($mdToast.simple().textContent('Inactive Module ' + self.module.name + ' cannot be Updated!').position('top right'));
          self.module = {};
          self.module.price = {};
          $state.go('manage-module');
        } else {
          Meteor.call("updateModule", self.module, $stateParams.moduleId, function(error, result) {
            if (error) {
              // toast for error with reason
            } else {
              $mdToast.show($mdToast.simple().textContent('Module ' + self.module.name + ' has been Updated!').position('top right'));
              self.module = {};
              self.module.price = {};
            }
            $state.go('manage-module');
          });
        }

      }

      // Add the new feature
      self.addFeature = (featureName) => {
          if (self.editIndex !== null) {
            self.module.features[self.editIndex]['name'] = featureName;
            self.btnValue = 'ADD';
          } else {
            self.module.features.push({
              'name': featureName
            });
          }
          self.featureName = null;
          self.editIndex = null;
        }
        // Edit the selected feature
      self.editFeature = (feature, index) => {
          self.btnValue = 'Update';
          self.editIndex = index;
          self.featureName = feature;
        }
        // Remove feature from list
      self.removeFeature = (index) => {
        getConfirmbox(index, $mdDialog);
      }

      function getConfirmbox(index, $mdDialog) {
        var confirm = $mdDialog.confirm() //for display the popup
          .title('Are you sure you want to delete ? ')
          .ariaLabel('Lucky day')
          .targetEvent(index)
          .ok('Delete It!')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
          console.log('delete : ');
          self.featureName = null;
          self.editIndex = null;
          self.module.features.splice(index, 1);
        }, function() {
          console.log('go back')
        });
      }

    }
  }
})