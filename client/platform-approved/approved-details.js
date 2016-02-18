
// var app = angular.module('edu-core').controller('ApprovedControl', function($scope, $stateParams, $reactive, $rootScope) {
//       $reactive(this).attach($scope);

//       let self = this;
//       // console.log($stateParams.aid);
//       var requestId = $stateParams.cid;
//       console.log(requestId);
//       self.helpers({
//           purchase: () => {
//               return PurchaseRequests.findOne({
//                   "_id": requestId
//               });
//           }
//       });
//     })