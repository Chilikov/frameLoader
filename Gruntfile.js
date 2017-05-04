module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Project configuration.
    var path = require('path'),
        CWD = path.resolve(__dirname);

    grunt.initConfig({
        root: CWD
    });

    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve(__dirname + '/grunt_tasks'),
        fileExtensions: ['js', 'coffee']
    }, function (err) {
        grunt.log.error(err);
    });

    // task(s).
    grunt.registerTask('default', ['concat:app', 'babel:app']);
};