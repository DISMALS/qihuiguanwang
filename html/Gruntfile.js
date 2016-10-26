"use strict";
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        cssmin: {
            options: {
                banner:"企汇网官网改版！"
            },
            one: {
                files: {
                    "pc/css/index.min.css": ["pc/css/index.css"]
                }
            },
            two: {
                src: ["pc/css/list.css"],
                dest: "pc/css/list.min.css"
            },
            three: {
                files: [
                    {
                        src: ["pc/css/other.css"],
                        dest: "pc/css/other.min.css"
                    }
                ]
            }
        },
        watch: {
            one: {
                files: ["pc/css/index.css"],
                tasks: ["cssmin:one"]
            },
            two: {
                files: ["pc/css/list.css"],
                tasks: ["cssmin:two"]
            },
            three: {
                files: ["pc/css/other.css"],
                tasks: ["cssmin:three"]
            }
        }
});

    //加载任务
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-watch");

    //执行任务
    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("one", ["watch:one"]);
    grunt.registerTask("two", ["watch:two"]);
    grunt.registerTask("three", ["watch:three"]);
    grunt.registerTask("cssm", ["cssmin"]);
}