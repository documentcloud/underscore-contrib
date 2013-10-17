module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-docco");

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
    },

    qunit: {
      main: ['test/index.html'],
      concat: ['test/dist-concat.html'],
      min: ['test/dist-min.html']
    },

    jshint: {
      all: [
        "*.js",
        "test/*.js"
      ],
      options: {
        indent: 2,     // Indent by 2 spaces
        eqnull: true,  // Allow 'x == null' convention
        "-W058": false // Allow 'new Constructor' without parens
      }
    },

    watch: {
      test: {
        files: [
          "underscore.*.js",
          "test/*.js"
        ],
        tasks: ["test"]
      }
    },

    docco: {
      docs: {
        src: ['docs/*.md'],
        options: {
          output: 'docs/'
        }
      },
      examples: {
        src: ['examples/*.md'],
        options: {
          output: 'examples/'
        }
      },
    }
  });

  grunt.registerTask("test", ["jshint", "qunit:main"]);
  grunt.registerTask("dist", ["concat", "uglify"]);
  grunt.registerTask('default', ['test']);
  grunt.registerTask('dist', ['test', 'concat', 'qunit:concat', 'uglify', 'qunit:min']);
};
