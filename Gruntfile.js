const sass = require('node-sass');

module.exports = function(grunt) {

    /**
     * Project configuration.
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
        ' * Sitepackage Generator v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under the <%= pkg.license %> license\n' +
        ' */\n',
        paths: {
            modules: 'node_modules/',
            scss: 'assets/scss/',
            css: 'public/css/',
            js: 'public/javascript/'
        },
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: [{
                    src: '<%= paths.scss %>theme.scss',
                    dest: '<%= paths.css %>theme.css'
                }]
            }
        },
        cssmin: {
            dist: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1
                },
                files: [{
                    src: '<%= paths.css %>theme.css',
                    dest: '<%= paths.css %>theme.min.css'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scss: {
                files: ['<%= paths.scss %>**/*.scss'],
                tasks: ['css']
            }
        },
        copy: {
            jquery: {
                src: '<%= paths.modules %>jquery/dist/jquery.min.js',
                dest: '<%= paths.js %>libs/jquery.min.js'
            },
            popper: {
                src: '<%= paths.modules %>popper.js/dist/umd/popper.min.js',
                dest: '<%= paths.js %>libs/popper.min.js'
            },
            bootstrap: {
                src: '<%= paths.modules %>bootstrap/dist/js/bootstrap.min.js',
                dest: '<%= paths.js %>libs/bootstrap.min.js'
            }
        }
    });

    /**
     * Register tasks
     */
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');

    /**
     * Grunt update task
     */
    grunt.registerTask('css', ['sass', 'cssmin']);
    grunt.registerTask('build', ['copy', 'css']);
    grunt.registerTask('default', ['build']);

};
