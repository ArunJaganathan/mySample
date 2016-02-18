angular.module('edu-core').directive('subscriptionList', function() {
  return {
    restrict: 'AE',
    templateUrl: 'client/manage-subscription/subscription.html',
    controllerAs: 'subscriptionCtrl',
    controller: function($scope, $reactive, $stateParams, $mdToast, $state, $mdDialog) {
      $reactive(this).attach($scope)
      let self = this;
      self.subscribe("packageList");
      self.helpers({
          packages: () => { //Fetch all records from DB
            return SubscriptionPackage.find({}, {sort: { _id: -1  }});
          }

        })
        //To publish package
      self.publishPackage = (packId, packName) => {
          Meteor.call("publishPackage", packId, function(error, result) {
            if (error) {
              getAlertbox($mdDialog, 'Oops, unable to update !');
            } else {
              getToastbox($mdToast, packName + ' Published successfully !');
              $state.go('subscriptionpackage');
            }
          });
        }
        //To delete package
      self.deletePackage = (packId, packName) => {
          getConfirmbox(packName, packId, $mdDialog, $mdToast);
        }
        //deActivate
      self.unpublishPackage = (packId, packName) => {
        Meteor.call("deActivate", packId, function(error, result) {
          if (error) {
            getToastbox($mdToast, 'Oops, unable to update !');
          } else {
            getToastbox($mdToast, packName + ' Package changed to INACTIVE mode !');
            $state.go('subscriptionpackage');
          }
        });
      }
    }
  }
  /*****************************Common Functions********************************/
  function getToastbox($mdToast, txt) {
    $mdToast.show($mdToast.simple().textContent(txt).position('top right'));
  }

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

  function getConfirmbox(packName, packId, $mdDialog, $mdToast) {
    var confirm = $mdDialog.confirm() //for display the popup
      .title('Are you sure you want to delete ')
      .textContent(packName + ' ?')
      .ariaLabel('Lucky day')
      .targetEvent(packId)
      .ok('Delete It!')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      Meteor.call("deletePackage", packId, function(error, result) {
        if (error) {
          getToastbox($mdToast, 'Unable to delete.Please try again !');
        } else {
          getToastbox($mdToast, 'Subscription package ' + packName + ' Deleted!');
        }
      });
    }, function() {
      getToastbox($mdToast, 'Server interrupted...Please try again !');
    });
  }

})