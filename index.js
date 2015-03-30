var Metalsmith = require('metalsmith');
var clean = require('metalsmith-clean');
var drafts = require('metalsmith-drafts');
var permalinks = require('metalsmith-permalinks');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var sass = require('metalsmith-sass');
var autoprefixer = require('metalsmith-autoprefixer');
var concat = require('metalsmith-concat');
var uglify = require('metalsmith-uglify');

Metalsmith(__dirname) //jshint ignore:line
    .use(clean())
    .use(drafts(true))
    .use(collections({
        'posts': {
            'pattern': 'posts/*.md',
            'sortBy': 'date',
            'reverse': true,
            'metadata': {
                'name': 'Posts',
                'description': ''
            }
        }
    }))
    .use(markdown({
        'smartypants': true,
        'gfm': true,
        'tables': true
    }))
    .use(permalinks({
        'pattern': ':date/:title',
        'date': 'YYYY'
    }))
    .use(templates({
        'engine': 'handlebars',
        'directory': './templates',
        'partials': {
            'head-meta': 'meta/head-meta',
            'head-seo': 'meta/head-seo',
            'head-icons': 'meta/head-icons',
            'head-polyfills': 'meta/head-polyfills',
            'head-stylesheets': 'meta/head-stylesheets',
            'header': 'partials/header',
            'masthead': 'partials/masthead',
            'footer': 'partials/footer',
            'scripts': 'partials/scripts'
        }
    }))
    .use(sass({
        'includePaths': [
            './src/assets/scss/'
        ],
        'outputStyle': 'compressed',
        'outputDir': 'assets/styles/'
    }))
    .use(autoprefixer())
    .use(concat({
        'files': [
            'assets/vendor/jquery/jquery.js',
            'assets/vendor/EventBus/dist/EventBus.js',
            'assets/vendor/basejs/build/base.js',
            'assets/scripts/config.js',
            'assets/scripts/shim.js',
            'assets/scripts/models/BaseModel.js',
            'assets/scripts/models/BreakpointModel.js',
            'assets/scripts/models/AppStateModel.js',
            'assets/scripts/views/BaseView.js',
            'assets/scripts/services/BreakpointListener.js',
            'assets/scripts/App.js',
            'assets/scripts/main.js'
        ],
        'output': 'assets/scripts/main.js'
    }))
    .use(uglify({
        'filter': [
            'assets/scripts/main.js',
            'assets/vendor/modernizr/modernizr.js'
        ],
        'removeOriginal': true
    }))
    .source('./src')
    .destination('./build')
    .build(function(err, files) {
        if (err) { throw err; } // jshint ignore:line
    });