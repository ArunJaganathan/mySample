/**
@author		 : varun <varun@cordovacloud.com>,
@date		 :
@params      : customerId
@description : fetch the customer Details using customerId
@scope		 : To approve a customer by a platform admin
**/
Meteor.publish("purchaseRequestNew", function(customerId) {
	let id = parseInt(customerId)
 	let result = PurchaseRequests.find({"id": id}).fetch();
  	console.log(result)
  return PurchaseRequests.find({"id": id});

});