module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    contribBanner:
      "// <%= pkg.name %> v<%= pkg.version %>\n" +
      "// =========================\n\n" +
      "// > <%= pkg.homepage %>\n" +
      "// > (c) 2013 Michael Fogus, DocumentCloud and Investigative Reporters & Editors\n" +
      "// > <%= pkg.name %> may be freely distributed under the <%= pkg.license %> license.\n\n",

    concat: {
      all: {
        src: "underscore.*.js",
        dest: "dist/underscore-contrib.js",
        options: { banner: "<%= contribBanner %>" }
      }
    },

    uglify: {
      all: {
        files: { "dist/underscore-contrib.min.js": "dist/underscore-contrib.js" },
        options: { banner: "<%= contribBanner %>" }
      }
    }
  });

  grunt.registerTask("default", ["concat", "uglify"]);
};
