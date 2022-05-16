const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' )(require( 'sass' ));
var postcss = require( 'gulp-postcss' );
var stylelint = require( '@ashleycaselli/gulp-stylelint' );
var autoprefixer = require( 'autoprefixer' );
var livereload = require('gulp-livereload');

gulp.task('css', function() {
	var processors = [
		autoprefixer( { browsers: ['last 2 versions'] } )
	];
	return gulp.src( './sass/style.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( postcss( processors ) )
		.pipe( gulp.dest( '.' ) )
		.pipe( livereload() );
});

gulp.task('lint', function() {
	return gulp.src( './sass/*.scss' )
		.pipe( stylelint( {
			reporters: [ {
				formatter: 'string',
				console: true
			} ]
		} ) )
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch( 'sass/**/*.scss', gulp.series('copy-folder'), gulp.series( 'lint', 'css' ) );
});

gulp.task('copy-folder', function() {  
	gulp.src('sass/**/*.scss')
	  .pipe(gulp.dest('./test'));
  });

exports.default = gulp.series( 'lint', 'css', 'watch' );
