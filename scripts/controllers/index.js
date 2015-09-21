angular.module('timelineApp.controllers', [])
    .controller('PostCtrl', ['$scope', '$timeout', 'WildDog', 'QiNiu', function ($scope, $timeout, WildDog, qiniu) {
      $scope.login = false;

      var postRef = WildDog.getDataRef('posts');

      var loadAndWatchData = function () {
        postRef.orderByChild('time').on('value', function (ss) {
          var array = [];
          var val = ss.val();
          for (var k in val) {
            if (val.hasOwnProperty(k)) {
              array.push(val[k]);
            }
          }
          console.log('load ' + array.length + ' posts');
          $timeout(function () {
            $scope.posts = array.reverse();
          }, 0);
        });
      };

      var authData = postRef.getAuth();
      console.log('authData:', authData);

      //if (authData) {
      //  $scope.login = true;
      //  loadAndWatchData();
      //}

      //loadAndWatchData();

      postRef.onAuth(function (authData) {
        if (authData) {
          console.log(authData);
          $timeout(function () {
            $scope.login = true;
            loadAndWatchData();
          }, 0);
        }
      });

      $scope.logout = function() {
        postRef.unAuth(function() {
          $timeout(function(){
            $scope.login = false;
          }, 0)
        });
      };

      $scope.authWithQQ = function () {
        postRef.authWithOAuthRedirect('qq', function (err, data) {
          if (err) {
            console.log(err);
          }
          if (data && data.token && data.token != '') {
            console.log(data);

          }

          //$scope.$apply(function() {
          //  $scope.login = true;
          //  loadAndWatchData();
          //});
        });
      };

      $scope.text = '';
      $scope.img = '';

      $scope.posts = [];


      $scope.addPost = function () {
        if ($scope.text.trim() == '' && $scope.img.trim() == '') {
          return console.log('both text and img are empty...');
        }
        var t = '' + $scope.text, i = '' + $scope.img;
        postRef.push({
          text: t,
          img: i,
          time: Date.now()
        });
        console.log('add one post');
        $scope.text = '';
        $scope.img = '';
      };

      $scope.$on('beforeUpload', function () {
        $scope.$apply(function () {
          $scope.uploading = true;
        });
      });

      $scope.$on('upload', function (e, data) {
        $scope.$apply(function () {
          $scope.img = data;
          $scope.uploading = false;
        });
      });
    }]);