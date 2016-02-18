// this is manage module directive
angular.module('edu-core').directive('manageModule', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/manage-module/manage-modules.html',
    controllerAs: 'manageModuleCtrl',
    controller: function($scope, $reactive, $mdDialog, $mdToast) {
      $reactive(this).attach($scope);
      let self = this;
      self.subscribe('modules');
      self.helpers({
        modules: () => {
          return Modules.find({})
        }
      })

      //deleting module
      self.removeModule = (id) => {
        modules = Modules.findOne({
          _id: id
        });
        getConfirmbox(modules, $mdDialog);
      }

      //publishing the Module
      self.publishModule = (modules) => {
        Meteor.call("publishModule", modules._id, function(error, result) {
          if (error) {
            console.log('Unable Publish Module');
          } else {
            $mdToast.show($mdToast.simple().textContent('Module ' + modules.name + ' Published!').position('top right'));
            console.log('Successfully Published!');
          }
        });
      }

      //Unpublishing the Module
      self.unPublishModule = (modules) => {
        Meteor.call("unpublishModule", modules._id, function(error, result) {
          if (error) {
            console.log('Unable to Unpublish Module');
          } else {
            $mdToast.show($mdToast.simple().textContent('Module ' + modules.name + ' Unpublished!').position('top right'));
            console.log('Unpublished!');
          }
        });
      }

      function getConfirmbox(modules, $mdDialog) {
        var confirm = $mdDialog.confirm() //for display the popup
          .title('Are you sure you want to delete ')
          .textContent(modules.name + ' ?')
          .ariaLabel('Lucky day')
          .targetEvent(modules._id)
          .ok('Delete It!')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
          Meteor.call("deleteModule", modules._id, function(error, result) {
            if (error) {
              console.log('Unable Delete');
            } else {
              $mdToast.show($mdToast.simple().textContent('Module ' + modules.name + ' Deleted!').position('top right'));
              console.log('Successfully removed');
            }
          });
        }, function() {
          console.log('go back')
        });
      }
    }
  }
})