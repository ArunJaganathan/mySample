//Model for purchase requests.
PurchaseRequests = new Mongo.Collection("purchase_requests");
let Schemas = {};
Schemas.ApproveSchema = new SimpleSchema({
    name: {
        type: String,
    },
    phoneNum: {
        type: String,

    },
    email: {
        type: String,
        
    },
    address1: {
        type: String,

    },
    address2: {
        type: String,

    },
    city: {
        type: String,

    },
    state: {
        type: String,

    },
    pincode: {
        type: String,

    },
    country: {
        type: String,

    },
    nameSchool: {
        type: String,

    },
    addressSchool: {
        type: String,

    },
    packageType: {
        type: String,

    },
    purchasePeriod: {
        type: String,

    },
    urlSchool: {
        type: String,

    },
    status: {
        type: String,

    },
    receivedOn: {
        type: Date

    }
});
PurchaseRequests.attachSchema(Schemas.ApproveSchema);

	
// let context = PurchaseRequests.simpleSchema().namedContext("ApproveSchema");
// let errorsList = context.invalidKeys();
// errorMsg = errorsList;
// console.log(errorsList);