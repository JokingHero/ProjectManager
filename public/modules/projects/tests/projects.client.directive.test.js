'use strict';

(function() {
    describe('Projects Directive Tests', function() {
        var scope,
            $compile;

        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        beforeEach(inject(function($rootScope, _$compile_) {
            scope = $rootScope.$new();
            $compile = _$compile_;
        }));

        it('Replaces the element with the appropriate content', function() {
            scope.parse = 'www.linkme.com';
            var element = $compile('<external-links parse="parse"></external-links>')(scope);
            scope.$digest();
            expect(element.html()).toContain('<a href="http://www.linkme.com" target="_blank">linkme.com</a>');
        });
    });
}());
