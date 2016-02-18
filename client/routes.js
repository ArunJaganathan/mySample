//Router for cordova login app
angular.module('edu-core').config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('platformAdmin', { //platform admin only for logged in users
        url: '/platform-admin',
        template: '<platform-admin></platform-admin>',
        resolve: {
          currentUser: ($q) => {
            if (Meteor.userId() == null) { //if not logged in, rejects the url
              return $q.reject('AUTH_REQUIRED');
            } else {
              return $q.resolve();
            }
          }
        }
      })
      .state('login', { //login
        url: '/login',
        template: '<login layout="row" layout-align="center center"></login>',
        resolve: {
          currentUser: ($q) => {
            if (Meteor.userId()) {
              return $q.reject('ALREADY_LOGGED_IN');
            } else {
              return $q.resolve();
            }
          }
        }
      })
      .state('tryImage', { //PLATFORM SETTINGS
        url: '/try-image',
        template: '<try-image></try-image>'
      })
      .state('platformSettings', { //PLATFORM SETTINGS
        url: '/platform-settings',
        template: '<platform-settings></platform-settings>'
      })


      .state('myProfile', { //MY PROFILE
        url: '/my-profile',
        template: '<my-profile></my-profile>'
      })


      .state('editProfile', { //EDITING OF PROFILE
        url: '/edit-profile/',
        template: '<edit-profile></edit-profile>'

      })


    .state('approved-req-details', {
      url: '/platform-approved/approved-details/:cid',
      template: '<approved-details></approved-details>'
    })
    .state('approveCreateSchool', {
      url: '/platform-approved/approved-create-school/:cid',
      template: '<approved-create-school></approved-create-school>'
    })
    .state('subscribe', {
      url: '/subscribe',
      template: '<subscribe></subscribe>'
    })
    .state('requestDetails', {
      /** @Name  : requestDetails
        * @Author: Jishnu
        * @Params : int requestId
        * @Desc  : Route for showing the request details in platform admin.
        */
      url: '/platform-admin/request-details/:reqId',
      template: '<request-details></request-details>'
    })      
    .state('view-school-details', {
      url: '/manage-school/view-school-details/:reqId',
      template: '<view-school-details></view-school-details>'
    })
    .state('register', { //register
      url: '/register',
      template: '<register layout="row" layout-align="center center"></register>'
    })
    .state('forgotPassword', { //fogot password
      url: '/forgot-password',
      template: '<forgot-password layout="row" layout-align="center center"></forgot-password>'
    })
    .state('enrollAccount', { //verifying account, this will get after clicking the lnik at mail 
      url: '/cordova/enroll-account/:token',
      template: '<verify-user layout="row" layout-align="center center"></verify-user>'
    })
    .state('changeUserPassword', { //Change password
      url: '/change-password',
      template: '<change-password></change-password>',
      resolve: {
        currentUser: ($q) => {
          if (Meteor.userId() == null) {
            return $q.reject('AUTH_REQUIRED');
          } else {
            return $q.resolve();
          }
        }
      }
    })
    .state('resetPassword', { //reset password
      url: '/cordova/reset-password/:token',
      template: '<reset-password></reset-password>'
    })
    .state('subscriptionpackage', { //subscription
      url: '/manage-subscriptions',
      template: '<subscription-list></subscription-list>'
    })
    .state('createSubpack', { //subscription package creation
      url: '/create-package',
      template: '<subscription-package></subscription-package>'
    })
    .state('editPackage', { //subscription package edit
      url: '/edit-package/:packId/',
      template: '<subscription-package></subscription-package>'
    })
    .state('announcement', { //announcement
      url: '/manage-announcement',
      template: '<announcement-page></announcement-page>'
    })
    .state('valState', {
      url: '/test',
      template: '<test-list></test-list>'
    })
    .state('collectState', {
      url: '/collect',
      template: '<collect-list></collect-list>'
    })
    .state('manage-module', {
      url: '/manage-module',
      template: '<manage-module></manage-module>'
    })
    .state('create-module', {
      url: '/manage-module/create-module',
      template: '<create-module></create-module>'
    })
    .state('edit-module', {
      url: '/edit-module/:moduleId/',
      template: '<create-module></create-module>'

    })
    .state('manage-school', {
      url: '/manage-school',
      template: '<manage-school></manage-school>'
    });

    $urlRouterProvider.otherwise("login")
  })
  .run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
      if (error === 'ALREADY_LOGGED_IN') {
        $state.go('platformAdmin');
      }
    });
  });
