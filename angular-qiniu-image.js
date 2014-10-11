angular.module('l42y.qiniu.image', [
]).directive('qiniuImage', function (
) {
  var ctrlAs = 'qiniu';

  return {
    restrict: 'EA',
    controller: function ($scope, $element, $attrs) {
      this.fops = [];
      var deregister;

      $attrs.$observe('qiniuImage', function (imageSrc, oldSrc) {
        if (imageSrc !== oldSrc) {
          if (deregister) deregister();

          deregister = $scope.$watchCollection(ctrlAs + '.fops', function (
            fops
          ) {
            if (fops.length) {
              var queryString = '';
              angular.forEach(fops, function (fop) {
                queryString += (fops.indexOf(fop) === 0
                                ? '?'
                                : '|') + fop;
              });

              $attrs.$set('src', imageSrc + queryString);
            }
          });
        }
      });
    },
    controllerAs: ctrlAs
  };
});
