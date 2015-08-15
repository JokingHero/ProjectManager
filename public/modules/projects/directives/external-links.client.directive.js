'use strict';
//  I belive it would be much better to use as filter e.g. <div ng-bind-html="parse | externalLinks"></div>
//  ngSanitize has weak solution (linky), istead of that or coming up with my own weak solution I used external lib Autolinker
angular.module('projects').directive('externalLinks',
    function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                parse: '='
            },
            template: '<div ng-bind-html="parse"></div>',
            link: function(scope) {
                scope.$watch('parse', function(newValue) {
                    if (newValue !== undefined) {
                        scope.parse = Autolinker.link(scope.parse);
                    }
                });
            }
        };
    }
);
