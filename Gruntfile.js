module.exports = function(grunt) {
  // ===============================================================
  // VARIABLES
  // ===============================================================
  var site_folder = grunt.option('dest') || 'www';
  var base = grunt.option('root') || 'repo/posts_angular/www';

  var SERVER_PORT = "7777";
  var DIST = './../';

  // SITE
  var site_folder = grunt.option('dest') || 'www';
  var wamp = ''; 
  var root = '';
  var destination_site = wamp + site_folder;
  var source_site = root + 'src';
  var lib_site = root + 'lib';

  //ADMIN
  var destination = destination_site;
  var source = root + 'admin/source';
  var lib = root + 'admin/lib';


  // ===============================================================
  // HTACCESS ANGULAR APPS
  // ===============================================================
  var ht_access_root = base;
  var htaccess = destination_site + '/.htaccess';
  var base_html = '<base href="/' + base + '/">';

	// ===============================================================
	// CONCAT RESSOURCES 
	// ===============================================================
	var jsconcat_src = [
  source_site + '/ws.config.js',
  source_site + '/app/*.js',
  source_site + '/filter/*.js',
  source_site + '/services/*.js',
  source_site + '/directives/*.js',
  source_site + '/parts/**/*.js'
  ]; 
  var jsconcat_dest = destination_site + '/js/app.js';
  
  var wsJsconcat_src = [
  source_site + '/wsJs/*.js'
  ]; 
  var wsJsconcat_dest = destination_site + '/js/ws.js';
	// ===============================================================
	// COPY RESSOURCES 
	// ===============================================================
	var copyarray_site_src = [source_site + '/parts/**/*html']
  var copyarray_site_dest = destination_site + '/pages';
  var copyarray_site_pages_src = [source_site + '/pages/*html']
  var copyarray_site_pages_dest = destination_site + '/pages';
  var copyarray_site_index_src = source_site + '/indexer/'
  var copyarray_site_index_dest = destination_site + '/';

  // ===============================================================
	// WATCH RESSOURCES 
	// ===============================================================
  var appjs_watch = [source_site + '/*.js', source_site + '/**/*.js', source_site + '/**/**/*.js'];
  var apphtml_watch = [source_site + '/*.html', source_site + '/**/*.html', source_site + '/**/**/*.html'];
  var appindex_watch = [source_site + '/indexer/*'];

  var appjs_watch = [source_site + '/**/*.js', '!' + source_site + '/wsJs/*.js'];
  var wsSass_watch = [source_site + '/sass/ws/*.scss', source_site + '/sass/ws.scss'];
  var wsJs_watch = [source_site + '/wsJs/*.js'];
  var html_watch = [source_site + '/parts/**/*.html', source_site + '/pages/*.html'];
  var lib_watch = ['lib/*', 'lib/**/*', 'lib/**/**/*', 'lib/**/**/**/*'];

    // Display the execution time when tasks are run:
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('./package.json'),

      concat: {
        appjs: {
          src: jsconcat_src,
          dest: jsconcat_dest
        },

        wsJs: {
          src: wsJsconcat_src,
          dest: wsJsconcat_dest
        }, 
      },

      sass: {
        ws: {
          files: [{ src : ['ws.scss'], cwd : source_site + '/sass', dest : destination_site + '', ext : '.min.css', expand : true }],
        }
      },

      copy: {
       // SITE FILES
       siteparts: {files: [{expand: true, src: copyarray_site_src, flatten: true, dest: copyarray_site_dest}]}, 
       sitepages: {files: [{expand: true, src: copyarray_site_pages_src, flatten: true, dest: copyarray_site_pages_dest}]}, 
       siteindex: { options : {"dot" : true}, files: [ {expand: true, cwd: copyarray_site_index_src, src: ['**'], dest: copyarray_site_index_dest}, ] },
       sitelib: { files: [ {expand: true, cwd: lib_site + '/', src: ['**'], dest: destination_site + '/'}, ] },
     },

        // ===================================================================
        // MINIFY JS RESOURCES
        // ===================================================================
        uglify: {
          options: {
            mangle: true,
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */' + "\n",
            compress: {
              drop_console: true
            }
          },
            //js: { files: { './dist/js/app.min.js' : ['js/app.min.js'] } }
          },


          watch: {
            gruntjs: { files: ['Gruntfile.js'], tasks: ['build'], options: {livereload: true}},  
            appjs: { files: appjs_watch, tasks: ['concat:appjs', 'concat:wsJs'], options: {livereload: true}}, 
            apphtml: { files: apphtml_watch, tasks: ['copy:sitepages', 'copy:siteparts'], options: {livereload: true}}, 
            appindex: { files: appindex_watch, tasks: ['copy:siteindex', 'replace:indexer'], options: {livereload: true}}, 
            wsJs: { files: wsJs_watch, tasks: ['concat:wsJs'], options: {livereload: true}}, 
            wsSass: { files: wsSass_watch, tasks: ['sass:ws'], options: {livereload: true}}, 
            wsLib: { files: lib_watch, tasks: ['copy:sitelib'], options: {livereload: true}}, 
          },

          clean: {
            dist: [destination_site]
          },

          replace: {
            indexer: {
              src: ['www/index.php'],
              overwrite: true,               
              replacements: [{
                from: '<!-- generate_base -->',
                to: "<!-- Generated on: <%= grunt.template.today('dd/mm/yyyy') %> -->\r\n" + base_html
              }]
            }
          },

          connect: {
            server: {
              options: {
                hostname: 'localhost',
                port: SERVER_PORT,
                base: destination_site,
                livereload: true
              }
            }
          },

        });

grunt.registerTask('htaccess', 'Creates an empty file', function() {
  var ht = '<IfModule mod_rewrite.c>\r\n' + 
  'RewriteEngine On\r\nRewriteBase /\r\n\r\n' +
  'RewriteCond %{REQUEST_FILENAME} !-f\r\n' +
  'RewriteCond %{REQUEST_FILENAME} !-d\r\n' +
  'RewriteRule ^plein/(.*)  /' + ht_access_root + '/plein.php?c=$1 [L]\r\n\r\n' +
  '# RewriteCond %{REQUEST_FILENAME} !-f\r\n# RewriteCond %{REQUEST_FILENAME} !-d\r\n' +
  '# RewriteRule ^(.*)  /' + ht_access_root + '/#/$1 [L]\r\n\r\n' +
  'RewriteCond %{REQUEST_FILENAME} !-f\r\n' + 
  'RewriteCond %{REQUEST_FILENAME} !-d\r\n' + 
  'RewriteCond %{REQUEST_URI} !index\r\n' + 
  'RewriteCond %{REQUEST_URI} !robots\r\n' + 
  'RewriteCond %{REQUEST_URI} !sitemap\r\n' + 
  'RewriteCond %{REQUEST_URI} !google\r\n' + 
  'RewriteRule (.*) ' + ht_access_root + '/index.php [L]\r\n\r\n' + 
  '</IfModule>';

  grunt.file.write(htaccess, ht);
});

require('matchdep').filterDev('grunt-*','package.json').forEach(grunt.loadNpmTasks);

grunt.registerTask('start', ['connect', 'watch']);
grunt.registerTask('build', ['copy', 'concat', 'uglify', 'sass', 'htaccess', 'replace']);
grunt.registerTask('default', ['build', 'connect','watch']);
};