/**
@author		 : varun <varun@cordovacloud.com>,
@date		 :
@params      : customer id -cId
@description : using customer id ,its key  "status:"new" is changed to "status":"approved"
@scope		 : To approve a customer by a platform admin
**/
Meteor.methods({
  approveCustomerRequest: function(cId) {
    // PurchaseRequests.update({
    // 	"id" : cId
    // } ,{$set : {"ddsd" :"approvsded "}});
    PurchaseRequests.insert(cId, function(error, result) {
    	if(error){
    		throw new Meteor.Error(PurchaseRequests.simpleSchema().namedContext().invalidKeys());
    	}else{
    		return "updated";
    	}
        
    });
  }
});