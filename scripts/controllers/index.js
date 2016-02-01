angular.module('timelineApp.controllers', [])
    .controller('PostCtrl', ['$scope', '$timeout', 'WildDog', 'QiNiu', function ($scope, $timeout, WildDog) {
      $scope.login = false;
      $scope.text = '';
      $scope.img = '';
      $scope.posts = [];

      var postRef = WildDog.getDataRef('posts');

      var loadAndWatchData = function () {
        postRef.orderByChild('time').limitToLast(10).on('value', function (ss) {
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

      loadAndWatchData();
    }]);