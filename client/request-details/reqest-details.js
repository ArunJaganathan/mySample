var app = angular.module('edu-core').directive('requestDetails', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/request-details/request-details.html',
    controllerAs: 'requestCtrl',
    controller: function($scope, $stateParams, $reactive) {
      $reactive(this).attach($scope);
      let self = this;
      
      var requestId = $stateParams.requestId;
      self.subscribe("purchaseRequestDetails",function(){return [requestId]});
      self.helpers({
        purchase: () => {
          return PurchaseRequests.findOne({
            "_id": requestId
          });
        }
      });

     self.approvePurchaseRequest = (id) => {
        PurchaseRequests.update({
          _id: id
        }, {

          $set: {

            status: "approved"

          }

        });
      }
      self.rejectPurchaseRequest = (id) => {
        PurchaseRequests.update({
          _id: id
        }, {

          $set: {

            status: "rejected"

          }

        });
      }
    }
  }
})
