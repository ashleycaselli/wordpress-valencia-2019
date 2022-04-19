const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' )(require( 'sass' ));
var postcss = require( 'gulp-postcss' );
var stylelint = require( 'gulp-stylelint' );
var autoprefixer = require( 'autoprefixer' );
var livereload = require('gulp-livereload');

function css() {
	var processors = [
		autoprefixer( { browsers: ['last 2 versions'] } )
	];
	return gulp.src( './sass/style.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( postcss( processors ) )
		.pipe( gulp.dest( '.' ) )
		.pipe( livereload() );
}

function lint() {
	return gulp.src( './sass/*.scss' )
		.pipe( stylelint( {
			reporters: [ {
				formatter: 'string',
				console: true
			} ]
		} ) )
}

function watch() {
	livereload.listen();
	gulp.watch( 'sass/**/*.scss', ['copy-folder'], gulp.series( lint, css ) );
}

gulp.task('copy-folder', function() {  
	gulp.src('sass/**/*.scss')
	  .pipe(gulp.dest('./test'));
  });

exports.css = css;
exports.lint = lint;
exports.default = gulp.series( lint, css, watch );
