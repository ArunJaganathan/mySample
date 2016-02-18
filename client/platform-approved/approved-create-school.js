angular.module('edu-core').directive('approvedCreateSchool', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/platform-approved/approved-create-school.html',
        controllerAs: 'requestCtrl',
        controller: function($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);
            let self = this;
            let purchase = {};
            let requestId = $stateParams.cid;
            self.approvedRequestDetails = {};
            self.dataToValidate = {};
            self.subscribe('purchaseRequestNew', () => {
                return [requestId]
            }, () => {
                self.approvedRequestDetails = PurchaseRequests.find({
                    "id": parseInt(requestId)
                }).fetch()[0];
            });
            self.approveCustomer = (id) => {
              console.log(self.approvedRequestDetails.phoneNumber);
              self.dataToValidate = {
                "name" : self.approvedRequestDetails.name,
                "email" : self.approvedRequestDetails.email,
                "phoneNum" : self.approvedRequestDetails.phoneNumber,
                "address1" : self.approvedRequestDetails.address1,
                "address2" : self.approvedRequestDetails.address2,
                "city" : self.approvedRequestDetails.city,
                "state" : self.approvedRequestDetails.state,
                "pincode" : self.approvedRequestDetails.pincode,
                "country" : self.approvedRequestDetails.country,
                "nameSchool" : self.approvedRequestDetails.nameSchool,
                "addressSchool" : self.approvedRequestDetails.addressSchool,
                "packageType" : self.approvedRequestDetails.packageType,
                "purchasePeriod" : self.approvedRequestDetails.purchasePeriod,
                "urlSchool" : self.approvedRequestDetails.urlSchool,
                "status" : self.approvedRequestDetails.status,
                "receivedOn": self.approvedRequestDetails.receivedOn
              };
              PurchaseRequests.simpleSchema().namedContext("ApproveSchema").validate(self.dataToValidate, {
                  modifier: false
              });
              let context = PurchaseRequests.simpleSchema().namedContext("ApproveSchema");
              let errorsList = context.invalidKeys();
              errorMsg = errorsList;
              console.log(errorsList);
              if(errorsList.length == 0){
                // Meteor.call('approveCustomerRequest', self.dataToValidate, function(error, result){
                //   if(error){
                //     console.log(error.error);
                //   }else{
                //     console.log("updated");
                //   }
                // });
              }
            }
        }
    }
})