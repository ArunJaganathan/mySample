angular.module('edu-core').directive('tryImage', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/try/try.html',
    controllerAs: 'tryCtrl',
    controller: function($scope, $reactive, $mdDialog) {
      $reactive(this).attach($scope);



      this.helpers({



        images: () => {
          return Images.find({});
        }
      });

      this.subscribe('images');



      this.addImages = (files) => {
        if (files.length > 0) {
          Images.insert(files[0]);
        }
      };
    }
  }
})