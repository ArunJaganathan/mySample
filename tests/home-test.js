// Test home page
// function to wrap methods with the provided preHooks / postHooks. Should correctly cascade the right value for `this`
function wrapMethods(preHooks, postHooks, methods){
	console.log(preHooks);
  var wrappedMethods = {};
  // use `map` to loop, so that each iteration has a different context
  _.map(methods, function(method, methodName){
    wrappedMethods[methodName] = makeFunction(method.length, function(){
      var  _i, _I, returnValue;
      for (_i = 0, _I = preHooks.length; _i < _I; _i++){
        preHooks.apply(this, arguments);
      }
      returnValue = method.apply(this, arguments);
      for (_i = 0, _I = postHooks.length; _i < _I; _i++){
        postHooks.apply(this, arguments);
      }
      return returnValue;
    });
  });
  return wrappedMethods;
}

// Meteor looks at each methods `.length` property (the number of arguments), no decent way to cheat it... so just generate a function with the required length
function makeFunction(length, fn){
  switch(length){
    case 0: 
      return function(){ return fn.apply(this, arguments); };
    case 1:
      return function(a){ return fn.apply(this, arguments); };
    case 2:
      return function(a, b){ return fn.apply(this, arguments); };
    case 3:
      return function(a, b, c){ return fn.apply(this, arguments); };
    case 4:
      return function(a, b, c, d){ return fn.apply(this, arguments); };
    // repeat this structure until you produce functions with the required length.
    default:
      throw new Error("Failed to make function with desired length: " + length)
  }
}

function checkUser(){
  check(this.userId, String);
}
Meteor.methods(wrapMethods([checkUser], [], {
  "privilegedMethod": function(a, b, c){
    return true;
  }
}));