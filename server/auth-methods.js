function checkAuth(userId) {
  if (!Roles.userIsInRole(userId, ['manage-customers'], 'platform-admin')) {
    return false;
  }
  return true;
}

Meteor.methods({

  //Create user without password
  //@param email {String}
  createUserWithoutPassword: function(email) {

    userId = Accounts.createUser({
      email: email,
    });

    //here just updates the user type
    Meteor.users.update(userId, {
      $set: {
        "type": "customer"
      }
    });

    //roles
    Roles.addUsersToRoles(userId, ['manage-customers', 'manage-school'], 'platform-admin')

    //Changing the email tempalte
    Accounts.emailTemplates.enrollAccount.text = function(user, url) {

      //Changing the url
      let res = url.replace("#/enroll-account", "cordova/enroll-account");

      return "You have been selected to participate in building a better future! Just checking" + " To activate your account, simply click the link below: Just checking\n\n" + res;
    };
    //if user is created then send enrollment mail
    if (userId) {
      Accounts.sendEnrollmentEmail(userId);
      return 'Check your email to set your password!';
    }

  },

  //Verifies and sets the new user password
  verifyUserByTokenId: function(token, newPassword, confirmPassword) {

    //basic validations
    if (newPassword === null) {
      throw new Meteor.Error("password-error", 'New Password field is required');
    }
    if (confirmPassword === null) {
      throw new Meteor.Error("password-error", 'Confirm Password field is required');
    }
    if (confirmPassword !== newPassword) {
      throw new Meteor.Error("password-error", 'Confirm Password should be match with new Password');
    }

    //find user by user token that we get from the link
    let user = Meteor.users.findOne({
      "services.password.reset.token": token
    });

    if (user === undefined) {
      throw new Meteor.Error('expired-token', 'Token has expired');
    }

    let email = user.services.password.reset.email;
    let userId = user._id;

    //update the user as verified
    Meteor.users.update({
      _id: user._id,
      'emails.address': email,
      'services.password.reset.token': token
    }, {
      $set: {
        'emails.$.verified': true
      }
    });

    //sets the new password for the user
    let res = Accounts.setPassword(userId, newPassword);

    return true;
  },

  //sends the reset password link to resets the new password
  sendPasswordResetLink: function(email) {

    if (email === "") {
      throw new Meteor.Error("email-error", 'Enter a valid email address');
    }
    //finds user by email
    let user = Meteor.users.findOne({
      "emails.address": email
    });

    if (user === undefined) {
      throw new Meteor.Error("user-not-found", 'User not found for this email');
    }

    let userId = user._id;

    //Changing the email tempalte
    Accounts.emailTemplates.siteName = "Cordova - Educore";
    Accounts.emailTemplates.from = "Cordova - Educore Admin <info@cordovacloud.com>";

    Accounts.emailTemplates.resetPassword.text = function(user, url) {

      let res = url.replace("#/reset-password", "cordova/reset-password");

      return "Please click the below link to reset your password\n\n" + res;
    };

    //if user exists for that user sends the reset password link
    if (userId) {
      Accounts.sendResetPasswordEmail(userId, email);
      return 'Check your email to set your password!';
    }
    return 'Check your email to set your password!';

  },

  //Resets the password by token that will get from the link from the mail
  resetPasswordByToken: function(token, newPassword, confirmPassword) {

    //basic validations
    if (newPassword === null) {
      throw new Meteor.Error("password-error", 'New Password field is required');
    }
    if (confirmPassword === null) {
      throw new Meteor.Error("password-error", 'Confirm Password field is required');
    }
    if (confirmPassword !== newPassword) {
      throw new Meteor.Error("password-error", 'Confirm Password should be match with New Password');
    }

    //finds user by token
    let user = Meteor.users.findOne({
      "services.password.reset.token": tokenRecord.token
    });

    let userId = user._id;
    console.log(userId);
    console.log(newPassword);
    //sets the new password
    Accounts.setPassword(userId, newPassword);
    return true;

  },

  //change password by user Id
  changePasswordByUserId: function(currentPassword, newPassword, confirmPassword, passwordObj) {

    //basic validations
    if (!currentPassword) {
      throw new Meteor.Error(403, 'Current Password field is required');
    }

    //get current user id
    let userId = Meteor.userId();

    let user = Meteor.user();

    // Check whether the current password matches the bcrypt'ed password in
    // the database user record.
    let result = Accounts._checkPassword(user, passwordObj);

    if (result.error)
      throw new Meteor.Error(403, 'Invalid Current Password');

    if (!newPassword) {
      throw new Meteor.Error(403, 'New Password field is required');
    }
    if (!confirmPassword) {
      throw new Meteor.Error(403, 'Confirm Password field is required');
    }
    if (confirmPassword !== newPassword) {
      throw new Meteor.Error(403, "Password doesn't match");
    }

    //sets the new password

    let res = Accounts.setPassword(userId, newPassword);

    return true;
  },

  //Authentication - user login
  authenticateUser: function(email, password) {

    /* Finds the user with the specified email.
    @param {String} email The email address to look for */

    if (!email)
      throw new Meteor.Error(403, 'Enter mandatory fields');

    let user = Accounts.findUserByEmail(email);

    if (!user)
      throw new Meteor.Error(403, 'Email or Password is not correct');

    // Check whether the provided password matches the bcrypt'ed password in
    // the database user record.
    let result = Accounts._checkPassword(user, password);

    if (result.error)
      throw new Meteor.Error(403, 'Email or Password is not correct');

    //creates new token for login
    let stampedLoginToken = Accounts._generateStampedLoginToken();

    //inserts newly created token to current user document
    Accounts._insertLoginToken(user._id, stampedLoginToken);

    res = {};
    res.token = stampedLoginToken.token;
    if (user.type == "admin")
      res.goTo = "platformAdmin";

    return res;
  }
});
