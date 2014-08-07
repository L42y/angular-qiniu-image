angular.module('l42y.qiniu.image', [
]).directive('qiniuImage', function () {
  var ctrlAs = 'qiniu';

  return {
    restrict: 'EA',
    controller: function ($scope, $element, $attrs) {
      this.fops = [];

      $scope.$watchCollection(ctrlAs + '.fops', function (fops) {
        $attrs.$observe('qiniuImage', function (imageSrc) {
          if (imageSrc) {
            var queryString = '?';
            angular.forEach(fops, function (fop) {
              queryString += fop;
            });

            $attrs.$set('src', imageSrc + queryString);
          }
        });
      });
    },
    controllerAs: ctrlAs
  };
});
