
module.exports = function (grunt) {

    return {
        app: {
            src: ['<%= root %>/eventEmitter.es6', '<%= root %>/loader.es6', '<%= root %>/listener.es6', '<%= root %>/index.es6'],
            dest: '<%= root %>/build/app.js'
        }
    };
};