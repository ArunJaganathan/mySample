

Meteor.publish("newPurchaseRequestList", function(opts) {
  Counts.publish(this, 'newPurchaseRequestListCount', PurchaseRequests.find({"status":"new"}), {noReady: true});
  return PurchaseRequests.find({"status":"new"},{
            skip: opts.skip,
            limit: opts.limit,
            sort:opts.sort,
            //fields: { name: 1 }
        })
});

Meteor.publish("newUpgradeRequestList", function(opts) {
  Counts.publish(this, 'newUpgradeRequestListCount', PurchaseRequests.find({"status":"renew"}), {noReady: true});
  return PurchaseRequests.find({"status":"renew"},{
            skip: opts.skip,
            limit: opts.limit,
            sort:opts.sort,
            //fields: { name: 1 }
        })
});

Meteor.publish("newRejectedRequestList", function(opts) {
  Counts.publish(this, 'newRejectedRequestListCount', PurchaseRequests.find({"status":"rejected"}), {noReady: true});
  return PurchaseRequests.find({"status":"rejected"},{
            skip: opts.skip,
            limit: opts.limit,
            sort:opts.sort,
            //fields: { name: 1 }
        })
});

Meteor.publish("newApprovedRequestList", function(opts) {
  Counts.publish(this, 'newApprovedRequestListCount', PurchaseRequests.find({"status":"approved"}), {noReady: true});
  return PurchaseRequests.find({"status":"approved"},{
            skip: opts.skip,
            limit: opts.limit,
            sort:opts.sort,
            //fields: { name: 1 }
        })
});

Meteor.publish("purchaseRequestDetails",function(requestId){
	return PurchaseRequests.find({"_id":requestId})
})
