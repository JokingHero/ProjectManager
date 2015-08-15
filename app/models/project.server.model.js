'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Validation function for project name length
 */
var validateProjectName = function(name) {
    return name && name.length > 40;
};

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill project name.',
        trim: true,
        validate: [validateProjectName, 'Project name should be over 40 characters.']
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    documentation: {
        type: String,
        default: '',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Project', ProjectSchema);
