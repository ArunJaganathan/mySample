angular.module('edu-core', ['angular-meteor', 'ui.router', 'accounts.ui', 'ngMaterial', 'angular-meteor.auth','ngFileUpload','ngImgCrop'])
.config(function($mdThemingProvider) {
  /*This is the theme mainly used in platform admin.*/
  var whiteCyanMap = $mdThemingProvider.extendPalette('cyan', {
    /*Extending pallete for those colors not in default.*/
    '500': '#EBEEF3', // Main background color.
    '100': '#00BCD5',
    '50': '#FFFFFF', //Header background color.
    '600': '#3099C6',
    '700' : '#57B3F3'

  });
  var lightPinkMap = $mdThemingProvider.extendPalette('pink', {
    '700': '#26A59A'
  });
  var darkRedMap = $mdThemingProvider.extendPalette('red', {
    '700': '#E35D5A'
  });
  $mdThemingProvider.definePalette('whiteCyan', whiteCyanMap);
  $mdThemingProvider.definePalette('lightPink', lightPinkMap);
  $mdThemingProvider.definePalette('darkRed', darkRedMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('whiteCyan', {
    	'default': '700',
      'hue-1': '50', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '100', // use shade 100 for the <code>md-hue-2</code> class
      'hue-3': '600' // use shade 600 for the <code>md-hue-3</code> class
        //'hue-4':'600'
    })
    .accentPalette('lightPink', {
      'default': '700'
    })
    .warnPalette('darkRed', {
      'default': '700'
    })
    .backgroundPalette('whiteCyan', {
      'default': "500"
    });

});