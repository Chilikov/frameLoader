
module.exports = function (grunt) {

    return {
        options: {
            "sourceMaps": false,
            "compact": true,
            "comments": false,
            "minified": true
        },
        app: {
            src: '<%= root %>/build/app.js',
            dest: '<%= root %>/build/frameLoader.min.js'
        }
    };
};