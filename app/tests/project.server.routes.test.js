'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Project = mongoose.model('Project'),
    agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, project;

/**
 * Project routes tests
 */
describe('Project CRUD tests', function() {
    beforeEach(function(done) {

        credentials = {
            username: 'username',
            password: 'password'
        };

        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: credentials.username,
            password: credentials.password,
            provider: 'local'
        });

        user.save(function() {
            project = {
                name: 'Project Name that is longer than 40 characters'
            };

            done();
        });
    });

    it('should be able to save Project instance if logged in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                if (signinErr) done(signinErr);

                var userId = user.id;

                agent.post('/projects')
                    .send(project)
                    .expect(200)
                    .end(function(projectSaveErr, projectSaveRes) {

                        if (projectSaveErr) done(projectSaveErr);

                        agent.get('/projects')
                            .end(function(projectsGetErr, projectsGetRes) {

                                if (projectsGetErr) done(projectsGetErr);

                                var projects = projectsGetRes.body;
                                (projects[0].user._id).should.equal(userId);
                                (projects[0].name).should.match('Project Name that is longer than 40 characters');

                                done();
                            });
                    });
            });
    });

    it('should not be able to save Project instance if not logged in', function(done) {
        agent.post('/projects')
            .send(project)
            .expect(401)
            .end(function(projectSaveErr, projectSaveRes) {
                done(projectSaveErr);
            });
    });

    it('should not be able to save Project instance if no name is provided', function(done) {
        project.name = '';

        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {

                if (signinErr) done(signinErr);

                var userId = user.id;
                agent.post('/projects')
                    .send(project)
                    .expect(400)
                    .end(function(projectSaveErr, projectSaveRes) {
                        (projectSaveRes.body.message).should.match('Please fill project name.');
                        done(projectSaveErr);
                    });
            });
    });

    it('should not be able to save Project instance if nome is too short', function(done) {
        project.name = 'To short';

        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {

                if (signinErr) done(signinErr);

                var userId = user.id;
                agent.post('/projects')
                    .send(project)
                    .expect(400)
                    .end(function(projectSaveErr, projectSaveRes) {
                        (projectSaveRes.body.message).should.match('Project name should be over 40 characters.');
                        done(projectSaveErr);
                    });
            });
    });

    it('should be able to update Project instance if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {

                if (signinErr) done(signinErr);

                var userId = user.id;
                agent.post('/projects')
                    .send(project)
                    .expect(200)
                    .end(function(projectSaveErr, projectSaveRes) {

                        if (projectSaveErr) done(projectSaveErr);

                        project.name = 'This is new project instance name over 40 characters';
                        project.description = 'This is description.';
                        project.documentation = '<p>Documentation may be a little long</p>';

                        agent.put('/projects/' + projectSaveRes.body._id)
                            .send(project)
                            .expect(200)
                            .end(function(projectUpdateErr, projectUpdateRes) {

                                if (projectUpdateErr) done(projectUpdateErr);

                                (projectUpdateRes.body._id).should.equal(projectSaveRes.body._id);
                                (projectUpdateRes.body.name).should.match('This is new project instance name over 40 characters');
                                (projectUpdateRes.body.description).should.match('This is description.');
                                (projectUpdateRes.body.documentation).should.match('<p>Documentation may be a little long</p>');

                                done();
                            });
                    });
            });
    });

    it('should be able to get a list of Projects if not signed in', function(done) {

        var projectObj = new Project(project);

        projectObj.save(function() {
            request(app).get('/projects')
                .end(function(req, res) {
                    res.body.should.be.an.Array.with.lengthOf(1);
                    done();
                });

        });
    });

    it('should be able to get a single Project if not signed in', function(done) {
        var projectObj = new Project(project);

        projectObj.save(function() {
            request(app).get('/projects/' + projectObj._id)
                .end(function(req, res) {
                    res.body.should.be.an.Object.with.property('name', project.name);
                    done();
                });
        });
    });

    it('should be able to delete Project instance if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {

                if (signinErr) done(signinErr);

                var userId = user.id;
                agent.post('/projects')
                    .send(project)
                    .expect(200)
                    .end(function(projectSaveErr, projectSaveRes) {

                        if (projectSaveErr) done(projectSaveErr);

                        agent.delete('/projects/' + projectSaveRes.body._id)
                            .send(project)
                            .expect(200)
                            .end(function(projectDeleteErr, projectDeleteRes) {

                                if (projectDeleteErr) done(projectDeleteErr);

                                (projectDeleteRes.body._id).should.equal(projectSaveRes.body._id);
                                done();
                            });
                    });
            });
    });

    it('should not be able to delete Project instance if not signed in', function(done) {
        project.user = user;
        var projectObj = new Project(project);

        projectObj.save(function() {
            request(app).delete('/projects/' + projectObj._id)
                .expect(401)
                .end(function(projectDeleteErr, projectDeleteRes) {
                    (projectDeleteRes.body.message).should.match('User is not logged in');
                    done(projectDeleteErr);
                });
        });
    });

    afterEach(function(done) {
        User.remove().exec();
        Project.remove().exec();
        done();
    });
});
