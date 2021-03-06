(function() {
    'use strict';

    angular.module('FacultyApp', [])

    .filter('rawHtml', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }]);
})();