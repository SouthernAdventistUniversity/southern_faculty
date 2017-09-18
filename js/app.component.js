(function() {
    'use strict';

    angular
        .module('FacultyApp')
        .component('facultyDirectory', {
            templateUrl: function($sce) {
                return $sce.trustAsResourceUrl('views/faculty_picture.html')
            },
            controller: ControllerController,
            bindings: {
                school: '@',
            },
        });

    ControllerController.inject = ['$scope', '$http', '$sce'];

    function ControllerController($scope, $http, $sce) {

        this.$onInit = () => {
            $http.get('http://www.southern.edu/api/people-search/' + this.school + '/employee_by_area', "json").then((result) => {
                $scope.faculty_names = result.data;
                console.log(result.data);
            })
        }

        $scope.showFacultyInfo = function(info) {
            info.Bio = decodeHtml(info.Bio);
            $scope.faculty = info;
            $http.get('php/faculty_info.php?teacher=' + info.PreferredName).then((result) => {
                $scope.classes_taught = result.data;
                console.log(result.data)
            })
        }

        $scope.closeFaculty = () => {
            $scope.faculty = null;
            $scope.classes_taught = null;
        }
    }

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
})();