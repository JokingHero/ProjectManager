'use strict';

(function() {
    describe('Projects Controller Tests', function() {
        var ProjectsController,
            scope,
            $httpBackend,
            $stateParams,
            $location;

        beforeEach(function() {
            jasmine.addMatchers({
                toEqualData: function(util, customEqualityTesters) {
                    return {
                        compare: function(actual, expected) {
                            return {
                                pass: angular.equals(actual, expected)
                            };
                        }
                    };
                }
            });
        });

        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
            scope = $rootScope.$new();

            $stateParams = _$stateParams_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;

            ProjectsController = $controller('ProjectsController', {
                $scope: scope
            });
        }));

        it('$scope.find() should create an array with at least one Project object fetched from XHR', inject(function(Projects) {
            var sampleProject = new Projects({
                name: 'New Project with really long name over 40 characters'
            });

            var sampleProjects = [sampleProject];
            $httpBackend.expectGET('projects').respond(sampleProjects);
            scope.find();
            $httpBackend.flush();

            expect(scope.projects).toEqualData(sampleProjects);
        }));

        it('$scope.findOne() should create an array with one Project object fetched from XHR using a projectId URL parameter', inject(function(Projects) {
            var sampleProject = new Projects({
                name: 'New Project with really long name over 40 characters'
            });
            $stateParams.projectId = '525a8422f6d0f87f0e407a33';
            $httpBackend.expectGET(/projects\/([0-9a-fA-F]{24})$/).respond(sampleProject);
            scope.findOne();
            $httpBackend.flush();

            expect(scope.project).toEqualData(sampleProject);
        }));

        it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Projects) {
            var sampleProjectPostData = new Projects({
                name: 'New Project with really long name over 40 characters'
            });

            var sampleProjectResponse = new Projects({
                _id: '525cf20451979dea2c000001',
                name: 'New Project with really long name over 40 characters'
            });

            scope.name = 'New Project with really long name over 40 characters';
            $httpBackend.expectPOST('projects', sampleProjectPostData).respond(sampleProjectResponse);
            scope.create();
            $httpBackend.flush();
            expect(scope.name).toEqual('');

            expect($location.path()).toBe('/projects/' + sampleProjectResponse._id);
        }));

        it('$scope.update() should update a valid Project', inject(function(Projects) {
            var sampleProjectPutData = new Projects({
                _id: '525cf20451979dea2c000001',
                name: 'New Project with really long name over 40 characters'
            });
            scope.project = sampleProjectPutData;
            $httpBackend.expectPUT(/projects\/([0-9a-fA-F]{24})$/).respond();
            scope.update();
            $httpBackend.flush();

            expect($location.path()).toBe('/projects/' + sampleProjectPutData._id);
        }));

        it('$scope.remove() should send a DELETE request with a valid projectId and remove the Project from the scope', inject(function(Projects) {

            var sampleProject = new Projects({
                _id: '525a8422f6d0f87f0e407a33'
            });
            scope.projects = [sampleProject];
            $httpBackend.expectDELETE(/projects\/([0-9a-fA-F]{24})$/).respond(204);
            scope.remove(sampleProject);
            $httpBackend.flush();

            expect(scope.projects.length).toBe(0);
        }));
    });
}());
