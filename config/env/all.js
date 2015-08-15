'use strict';

module.exports = {
    app: {
        title: 'ProjectManager',
        description: 'UXPin testing my patience :P',
        keywords: 'Project Manager MEAN'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'swig',
    sessionSecret: 'MEAN',
    sessionCollection: 'sessions',
    sessionCookie: {
        path: '/',
        httpOnly: true,
        // If secure is set to true then it will cause the cookie to be set
        // only when SSL-enabled (HTTPS) is used, and otherwise it won't
        // set a cookie. 'true' is recommended yet it requires the above
        // mentioned pre-requisite.
        secure: false,
        // Only set the maxAge to null if the cookie shouldn't be expired
        // at all. The cookie will expunge when the browser is closed.
        maxAge: null,
        // To set the cookie in a specific domain uncomment the following
        // setting:
        // domain: 'yourdomain.com'
    },
    // The session cookie name
    sessionName: 'connect.sid',
    assets: {
        lib: {
            css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-bootstrap-colorpicker/css/colorpicker.css',
        'public/lib/font-awesome/css/font-awesome.css',
        'public/lib/textAngular/dist/textAngular.css'
			],
            js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/textAngular/dist/textAngular-rangy.min.js',
        'public/lib/textAngular/dist/textAngular-sanitize.min.js',
        'public/lib/textAngular/dist/textAngular.min.js',
        'public/lib/Autolinker.js/dist/Autolinker.js'
			]
        },
        css: [
			'public/modules/**/css/*.css'
		],
        js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
        tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
    }
};
