const {src, dest, series, watch, parallel} = require('gulp')
const less = require('gulp-less')
const babel = require('gulp-babel')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const csso = require('gulp-csso')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const del = require('del')
const fileinclude = require('gulp-file-include')
const terser = require('gulp-terser')
const sync = require('browser-sync').create()

// HTML

const html = () => {
  return src('src/*.html')
    .pipe(fileinclude())
    .pipe(dest('docs'))
    .pipe(sync.stream())
}

exports.html = html

// Styles

const styles = () => {
  return src('src/less/**.less')
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('index.min.css'))
    .pipe(dest('docs/css'))
    .pipe(sync.stream())
}

exports.styles = styles

// Styles libs

const stylesLibs = () => {
  return src([
    'node_modules/swiper/swiper-bundle.min.css',
  ])
    .pipe(concat('libs.min.css'))
    .pipe(dest('docs/css'))
    .pipe(sync.stream())
};

exports.stylesLibs = stylesLibs

// Scripts libs

const scriptsLibs = () => {
  return src([
      'node_modules/focus-visible/dist/focus-visible.min.js',
      'node_modules/scroll-lock/dist/scroll-lock.min.js',
      'node_modules/swiper/swiper-bundle.min.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(dest('docs/js'))
    .pipe(sync.stream())
};

exports.scriptsLibs = scriptsLibs

// Scripts

const scripts = () => {
  return src('src/js/*.js')
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(concat('index.min.js'))
    .pipe(terser())
    .pipe(dest('docs/js'))
    .pipe(sync.stream())
};

exports.scripts = scripts

// Copy

const copy = () => {
  return src(['src/fonts/**/*', 'src/img/**/*'], { base: 'src' })
    .pipe(dest('docs'))
    .pipe(sync.stream({ once: true }))
};

exports.copy = copy

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'docs'
    },
    cors: true,
    ui: false,
    notify: false,
  });
  done();
};

exports.server = server

// Clear

const clear = () => {
  return del('docs')
}

exports.clear = clear

// Watch

const watcher = () => {
  watch('src/*.html', series(html))
  watch('src/less/**/*.less', series(styles))
  watch('src/js/**/*.js', series(scripts))
  watch(['src/fonts/**/*', 'src/img/**/*',], series(copy))
};

exports.watcher = watcher

// Default

exports.default = series(
  clear,
  parallel(
    html,
    styles,
    stylesLibs,
    scriptsLibs,
    scripts,
    copy,
  ),
  parallel(
    watcher,
    server,
  ),
)
