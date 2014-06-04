#Grunt and Karma

Make sure that your final project and Week08InClassMarkdown pass:

- grunt jshint
- grunt pretty

## The Grunt File

This grunt file or one like it should work for you:

```
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        jshint: {
            files: ['**/*.js'],

            options: {
                ignores: [
                    '**/coverage/**',
                    '**/node_modules/**',
                    '**/Tests/Jasmine-2.0.0/**',
                    '**/jquery-2.1.0.min.js',
                    '**/jquery-2.1.1.js',
                    '**/require.js',
                    '**/Markdown/Converter.js',
                    '**/Markdown/Editor.js',
                    '**/Markdown/Sanitizer.js'
                ],
                reporter: 'checkstyle',
                reporterOutput: 'result.xml',
                strict: true,
                newcap: false,
                globals: {
                    describe: true,
                    afterEach: true,
                    beforeEach: true,
                    inject: true,
                    it: true,
                    jasmine: true,
                    expect: true,
                    angular: true,
                    module: true,
                    Crafty: true
                }
            }
        },

        clean: {
            work: {
                src: ["**/node_modules/**"]
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        jsbeautifier: {
            files: ["**/*.js",
                '!**/node_modules/**',
                '!**/coverage/**',
                '!**/jasmine-2.0.0/**',
                '!**/jquery-2.1.1.js',
                '!**/require.js',
                '!**/Markdown/Converter.js',
                '!**/Markdown/Editor.js',
                '!**/Markdown/Sanitizer.js'
            ],
            options: {
                js: {
                    mode: "VERIFY_AND_WRITE"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('pretty', ['jsbeautifier']);
};
```


> Written with [StackEdit](https://stackedit.io/).