var app = angular.module('edu-core').directive('subscribe', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/subscription/subscribe.html',
    controllerAs: 'purchaseRequest',
    controller: function($scope, $reactive) {
        $reactive(this).attach($scope);
        let self = this
        //
        self.newPurchase = {};
        
        self.packageTypes=[{"name":"Gold","value":"gold"},{"name":"Silver","value":"silver"},{"name":"Platinum","value":"platinum"}];
        self.purchasePeriods=[{"name":"Monthly","value":"monthly"},{"name":"Weekly","value":"weekly"},{"name":"Daily","value":"daily"}];
        self.addRequest = () => {
            self.newPurchase.status = "new";
            self.newPurchase.receivedOn = new Date();
            PurchaseRequests.insert(self.newPurchase);
            alert("Saved");
            self.newPurchase = {};
        };
        self.countries = [{
            name: 'India'
        }, {
            name: 'UAE'
        }, {
            name: 'USA'
        }];
       

    }
  }
})
