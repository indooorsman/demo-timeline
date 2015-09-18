angular.module('timelineApp.directives', [])
    .directive('cardCover', ['$http', function ($http) {
      return {
        restrict: 'A',
        link: function (scope, ele, attr) {
          var img = attr.cardCover;
          $http.head(img).then(function success() {
            ele.css('background-image', 'url(' + img + ')');
          }, function error() {
            ele.css({
              'height': 'auto',
              'text-align': 'center',
              'background-color': '#cccccc',
              'padding': '20px 0'
            });
            ele.html('图片加载出错 :(');
          });
        }
      }
    }]);