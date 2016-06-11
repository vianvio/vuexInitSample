var gulp = require('gulp');
var rollup = require('rollup').rollup;
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');
var vueLoader = require('rollup-plugin-vue');
var babel = require('rollup-plugin-babel');

gulp.task('script', function() {
  return rollup({
    entry: 'app/index.js',
    plugins: [
      vueLoader(),
      nodeResolve({
        jsnext: true,
        main: true
      }),
      commonjs({
        // non-CommonJS modules will be ignored, but you can also
        // specifically include/exclude files
        include: 'node_modules/**', // Default: undefined
        // exclude: ['node_modules/foo/**', 'node_modules/bar/**'], // Default: undefined

        // search for files other than .js files (must already
        // be transpiled by a previous plugin!)
        extensions: ['.js', '.coffee'], // Default: [ '.js' ]

        // if true then uses of `global` won't be dealt with by this plugin
        ignoreGlobal: false, // Default: false

        // if false then skip sourceMap generation for CommonJS modules
        sourceMap: false, // Default: true

        // explicitly specify unresolvable named exports
        // (see below for more details)
        namedExports: { './module.js': ['foo', 'bar'] } // Default: undefined 
      }),
      babel({
        exclude: 'node_modules/**',
        // include: 'node_modules/vue-strap',
        plugins: ['external-helpers', 'external-helpers-2'],
        externalHelpers: true,
        runtimeHelpers: true
      })
    ]
  }).then(function(bundle) {
    return bundle.write({
      format: 'iife',
      dest: 'dist/js/app.js'
    });
  });
});
