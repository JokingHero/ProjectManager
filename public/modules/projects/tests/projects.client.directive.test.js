'use strict';

(function() {
    describe('Projects Directive Tests', function() {
        var scope,
            $compile,
            element;

        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        beforeEach(inject(function($rootScope, _$compile_) {
            scope = $rootScope.$new();
            $compile = _$compile_;

            scope.parse = 'www.linkme.com';
            element = $compile('<external-links parse="parse"></external-links>')(scope);
            scope.$digest();
        }));

        it('Replaces the element with the appropriate content', function() {
            expect(element.html()).toContain('<a href="http://www.linkme.com" target="_blank">linkme.com</a>');
        });

        it('parse on isolated scope should be two-way bound', function() {
            var isolatedScope = element.isolateScope();
            isolatedScope.parse = 'something new';
            scope.$digest();
            expect(scope.parse).toEqual('something new');
        });

        it('should have replaced directive element', function() {
            expect(element.find('external-links').length).toEqual(0);
        });
    });
}());
