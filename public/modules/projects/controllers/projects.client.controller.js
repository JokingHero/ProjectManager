'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects',
	function($scope, $stateParams, $location, Authentication, Projects) {
        $scope.authentication = Authentication;
        $scope.toolbar = [
      		['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
      		['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
      		['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
      		['html', 'insertImage', 'insertLink']
  			];
				
        $scope.create = function() {

                var project = new Projects({
                    name: this.name,
                    description: this.description,
                    documentation: this.documentation
                });

                project.$save(function(response) {
                    $location.path('projects/' + response._id);
                    $scope.name = '';
										$scope.description = '';
										$scope.documentation = '';
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
        };

        $scope.remove = function(project) {
            if (project) {
                project.$remove();

                for (var i in $scope.projects) {
                    if ($scope.projects[i] === project) {
                        $scope.projects.splice(i, 1);
                    }
                }
            }
            else {
                $scope.project.$remove(function() {
                    $location.path('projects');
                });
            }
        };

        $scope.update = function() {
                var project = $scope.project;

                project.$update(function() {
                    $location.path('projects/' + project._id);
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
        };

        $scope.find = function() {
            $scope.projects = Projects.query();
        };

        $scope.findOne = function() {
            $scope.project = Projects.get({
                projectId: $stateParams.projectId
            });
        };
	}
]);
