angular.module('l42y.qiniu.image', [
]).directive('qiniuImage', function (
) {
  var ctrlAs = 'qiniu';

  return {
    scope: true,
    restrict: 'EA',
    controller: function ($scope, $element, $attrs) {
      this.fops = {};
      var deregister;

      $attrs.$observe('qiniuImage', function (imageSrc, oldSrc) {
        if (imageSrc !== oldSrc) {
          if (deregister) deregister();

          deregister = $scope.$watchCollection(ctrlAs + '.fops', function (
            fops
          ) {
            if (Object.keys(fops).length) {
              var queryString = '';
              angular.forEach(fops, function (fop, identifier) {
                queryString += (Object.keys(fops)[0] === identifier
                                ? '?'
                                : '|') + fop;
              });

              var imgUrl = imageSrc + queryString;
              if ($element[0].nodeName.toLowerCase() === 'img') {
                $attrs.$set('src', imgUrl);
              } else {
                $element.css({
                  'width': $attrs.width,
                  'height': $attrs.height,
                  'background-image': 'url("' + imgUrl + '")'
                });
              }
            }
          });
        }
      });
    },
    controllerAs: ctrlAs
  };
});
