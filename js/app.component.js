(function() {
    'use strict';

    angular
        .module('FacultyApp')
        .component('facultyDirectory', {
            templateUrl: function($sce) {
                return $sce.trustAsResourceUrl('http://d2cd1094.ngrok.io/faculty/views/faculty_picture.html')
            },
            controller: ControllerController,
            bindings: {
                school: '@',
            },
        });

    ControllerController.inject = ['$scope', '$http', '$sce'];

    function ControllerController($scope, $http, $sce) {
        console.log("HI")
        this.$onInit = () => {
            $http.get('http://www.southern.edu/api/people-search/' + this.school + '/employee_by_area').then((result) => {
                $scope.faculty_names = result.data;
                //console.log(result.data);
            })
        }

        $scope.showFacultyValue = function(info) {
            console.log(info)
        }
    }
})();