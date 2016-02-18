angular.module('edu-core').directive('platformAdmin', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/platform-dashboard/dashboard.html',
    controllerAs: 'dashboardCtrl',
    controller: function($scope, $reactive, $mdDialog, $mdMedia) {
      $reactive(this).attach($scope);

      let self = this
      /* Pagination variables for request subscribes. */

      self.perPage = 3; // No: of items per page.
      self.page = 1;    // Starting page number. Current page number is updated in this var.
      self.sort = {     
        name: 1          // Sort with name
      };

      self.currentTab = null; // Var to keep current tab name.

      $scope.tabSelect = function(tabs,status) { // Triggers on tab select event and on the page load.
          self.currentTab = tabs; 
          self.status = status; // Status is the "status" value of requests to be loaded in current
                                // tab content.
          initDynamicItems();   // Initialise DynamicItems object for scrolling. 
          self.countIdentifier = tabs + "Count";  // Identifier for getting the total count of items
                                                  // in current tab from meteor server.
        }
      
      self.addRequest = () => {
        self.newPurchase.status = "new";
        PurchaseRequests.insert(self.newPurchase);
      };

      self.approvedRequestDetails = {};
      self.showAdvanced = (ev) => {
        console.log({"id":ev});
        self.approvedRequestDetails =  PurchaseRequests.findOne({"id":ev});
        // console.log(self.approvedRequestDetails);
        var useFullScreen = ($mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
            targetEvent: ev,
            locals: {"data":self.approvedRequestDetails},
            controller: DialogController,
            controllerAs: 'ctrl',
            bindToController: true,
            templateUrl: 'client/platform-approved/approved-details.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen,
            preserveScope:true
          });
       }
      
      var DynamicItems = function() {
        /**
         * @type {!Object<?Array>} Data pages, keyed by page number (0-index).
         */

        this.loadedPages = {};
        /** @type {number} Total number of items. */
        this.numItems = 0;
        /** @const {number} Number of items to fetch per request. */
        this.PAGE_SIZE = self.perPage;
        this.fetchNumItems_();
      };
      // Required.
      DynamicItems.prototype.getItemAtIndex = function(index) {
        var pageNumber = Math.floor(index / this.PAGE_SIZE);
        var page = this.loadedPages[pageNumber];
        if (page) {
          return page[index % this.PAGE_SIZE];
        } else if (page !== null) {
          this.fetchPage_(pageNumber);
        }
      };
      // Required.
      DynamicItems.prototype.getLength = function() {
        return this.numItems;
      };
      DynamicItems.prototype.fetchPage_ = function(pageNumber) {
        // Set the page to null so we know it is already being fetched.
        dyn = this;
        dyn.loadedPages[pageNumber] = null;
        // For demo purposes, we simulate loading more items with a timed
        // promise. In real code, this function would likely contain an
        // $http request.

        self.page = pageNumber + 1;
        dyn.loadedPages[pageNumber] = [];
        var pageOffset = pageNumber * this.PAGE_SIZE;

        self.subscribe(self.currentTab, () => {

          return [{
            limit: parseInt(self.perPage),
            skip: parseInt((self.page - 1) * self.perPage),
            sort: self.sort
          }]
        }, function() {
          data = PurchaseRequests.find({"status":self.status}).fetch();

          for (var i = pageOffset; i < pageOffset + self.perPage; i++) {
            if(data[i] === undefined){
              break; // if total count is not a multiple of pageSize
            }
                       
            data[i].receivedOn = new Date(data[i].receivedOn).toLocaleString();
            
            dyn.loadedPages[pageNumber].push(data[i]);
          
           
          }

        });

        // this.loadedPages[pageNumber] = [];
        // var pageOffset = pageNumber * this.PAGE_SIZE;
        // for (var i = pageOffset; i < pageOffset + this.PAGE_SIZE; i++) {
        //   this.loadedPages[pageNumber].push(i);
        // }

      };
      DynamicItems.prototype.fetchNumItems_ = function() {
        // For demo purposes, we simulate loading the item count with a timed
        // promise. In real code, this function would likely contain an
        // $http request.
        this.numItems = Counts.get(self.countIdentifier); //change later
      }
      self.currentTab = self.currentTab === null ? "newPurchaseRequestList" : self.currentTab;

      function initDynamicItems() {
        self.subscribe(self.currentTab, () => {
          
          return [{
            limit: parseInt(self.perPage),
            skip: parseInt((self.page - 1) * self.perPage),
            sort: self.sort
          }]
        }, function() {
         // self.requests = PurchaseRequests.find().fetch({"status":status});

          self.dynamicItems = new DynamicItems();

        });
      }
      //initDynamicItems();
    }
  }

  function DialogController($scope, $mdDialog, data) {

    $scope.obj = data;
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
})

// db.purchase_requests.insert({"name" : "Tendulkar", "email" : "lakshmikant@cordovacloud.com", "phoneNumber" : "918891111454", "address1" : "Cordova cloud", "address2" : "Thycaud", "city" : "TVM", "state" : "Kerala", "pincode" : "695002", "country" : "India", "nameSchool" : "Model School", "addressSchool" : "Thycaud", "packageType" : "gold", "purchasePeriod" : "weekly", "urlSchool" : "modelschool", "status" : "new", "receivedOn" : ISODate("2016-02-01T05:52:41.300Z") })
