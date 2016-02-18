angular.module('edu-core').directive('announcementPage', function() {
  return {
    restrict: 'AE',
    templateUrl: 'client/manage-announcement/announcement.html',
    controllerAs: 'announcementCtrl',
    controller: function($scope, $reactive, $mdDialog, $mdToast, $state) {
      $reactive(this).attach($scope)
      let self = this;
      let dataArry = {};
      Meteor.subscribe("announcementList");
      self.helpers({

        achievedArry: () => { //Fetch all records from DB
          return Announcement.find({}, {
            sort: {
              _id: -1
            }
          });
        }
      })
      self.dataArry = {};
      $scope.errors = {};
      //To save announcement
      self.sendAnnouncement = (data, action) => {

        let announcementSchema = new SimpleSchema({
          description: {
            type: String,
            label: "description",
            min: 5
          },
          send_to: {
            type: String,
            label: "Select user"
          }

        });
        /**
        below is the way to attach the scheme
        **/
        Announcement.attachSchema(announcementSchema, {
          replace: true
        });

        /**
        below is the way to validate.we are passing the data as chumma_data against the schema
        **/
        //console.log('<<==>>')
        // console.log(self.dataArry);
        Announcement.simpleSchema().namedContext("announcementSchema").validate(self.dataArry, {
          modifier: false
        });

        /**
        below is the way to get the keys which has broken its corresponding rules
        **/
        let context = Announcement.simpleSchema().namedContext("announcementSchema");
        let errorsList = context.invalidKeys();

        /**
        below we are consoling it
        **/
        // console.log(errorsList);
        /**
        below we are checking any errors are there ,by  errorsList.length
        **/

        if (errorsList.length > 0) {
          for (let i = 0; i < errorsList.length; i++) {
            //console.log(errorsList[i])
            if (errorsList[i]['name'] == "description") {
              $scope.errors['description'] = "Please enter description";
            }
            if (errorsList[i]['type'] == "minString") {
              $scope.errors['description'] = "Description too short";
              getToastbox($mdToast, 'Description too short !');
            }
            if (errorsList[i]['name'] == "send_to") {
              $scope.errors['send_to'] = 'Please select any users';
            }

          }
        } else {
          $scope.errors = {};
          self.dataArry.date_added = new Date();
          if (action == 'save') {
            dataArry = self.dataArry;
          }

          if (action == "resend") {
            dataArry.description = data.description;
            dataArry.date_added = data.date_added;
            dataArry.send_to = data.send_to;
            dataArry.date_added = new Date();
          }
          // console.log(action);
          // console.log(dataArry);
          Meteor.call("announceSend", dataArry, action, function(err, result) {
            if (err) {
              getToastbox($mdToast, 'Oops, unable to save !');
            } else {
              self.dataArry = '';
              if (action == 'save') {
                getToastbox($mdToast, 'Announcement successfully sended !');
              }
              if (action == 'resend') {
                getToastbox($mdToast, 'Announcement successfully updated and sended !');
              }
              $state.go('announcement');
            }

          });
        }




      }
      self.viewAnnouncement = (data) => {
        getAnnouncewindow($mdDialog, data)
      }
      self.editResendAnnouncement = (data) => {
        self.dataArry = data;
      }
      self.cancelAnnouncement = () => {
        self.dataArry = '';
      }
    }
  }
  /***********************Common Functions***********************************/
  function toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }


  function getToastbox($mdToast, txt) {
    $mdToast.show($mdToast.simple().textContent(txt).position('top right'));
  }

  function getAlertbox($mdDialog, txt) {
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title(txt)
      .textContent('')
      .ariaLabel('Alert Dialog Demo')
      .ok('OK !')
      .targetEvent()
    );
  }

  function getAnnouncewindow($mdDialog, data) {
    if (data.send_to == 1) send_to = 'All Admin';
    else send_to = 'All Users';
    let dateFormat = toJSONLocal(data.date_added);
    $mdDialog.show(
      $mdDialog.alert()
      .clickOutsideToClose(true)
      .title('Announcement Details to ' + send_to)
      .textContent(data.description + ' sended on ' + dateFormat)
      .ariaLabel('Left to right demo')
      .ok('Close')
      .openFrom('#left')
      .closeTo(angular.element(document.querySelector('#right')))
    );
  }

})